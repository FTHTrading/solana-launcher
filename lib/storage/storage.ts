import type { UploadResult, MetadataUploadResult, StorageProvider, TokenMetadata } from '@/types';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// STORAGE ABSTRACTION LAYER
//
// Abstracts image + metadata uploads from
// the rest of the app. Provider is swappable
// via environment variable.
// =============================================

export interface StorageAdapter {
  uploadFile(file: File): Promise<UploadResult>;
  uploadMetadata(metadata: TokenMetadata): Promise<MetadataUploadResult>;
}

// ----- Pinata Adapter -----

async function uploadFileToPinata(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'pinataMetadata',
    JSON.stringify({ name: `token-image-${Date.now()}` })
  );
  formData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }));

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT ?? ''}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata file upload failed: ${res.status} ${text}`);
  }

  const data = await res.json() as { IpfsHash: string };
  return {
    uri: `ipfs://${data.IpfsHash}`,
    provider: 'pinata',
  };
}

async function uploadMetadataToPinata(
  metadata: TokenMetadata
): Promise<MetadataUploadResult> {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PINATA_JWT ?? ''}`,
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: { name: `token-metadata-${Date.now()}` },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata metadata upload failed: ${res.status} ${text}`);
  }

  const data = await res.json() as { IpfsHash: string };
  return {
    uri: `ipfs://${data.IpfsHash}`,
    provider: 'pinata',
    metadata,
  };
}

const pinataAdapter: StorageAdapter = {
  uploadFile: uploadFileToPinata,
  uploadMetadata: uploadMetadataToPinata,
};

// ----- NFT.Storage Adapter (stub) -----
// TODO: Implement when NFT_STORAGE_TOKEN is configured
const nftStorageAdapter: StorageAdapter = {
  async uploadFile(_file: File): Promise<UploadResult> {
    throw new Error('NFT.Storage adapter not yet implemented. Use Pinata or Web3.Storage.');
  },
  async uploadMetadata(_metadata: TokenMetadata): Promise<MetadataUploadResult> {
    throw new Error('NFT.Storage adapter not yet implemented.');
  },
};

// ----- Provider Resolution -----

function resolveAdapter(provider: StorageProvider): StorageAdapter {
  switch (provider) {
    case 'pinata':
      return pinataAdapter;
    case 'nft-storage':
      return nftStorageAdapter;
    default:
      console.warn(`[storage] Unknown provider "${provider}", falling back to Pinata`);
      return pinataAdapter;
  }
}

export function getStorageAdapter(): StorageAdapter {
  return resolveAdapter(appConfig.storage.provider);
}

// =============================================
// GATEWAY URL HELPER
// Converts ipfs:// URI to a gateway HTTP URL
// =============================================

export function toGatewayUrl(uri: string): string {
  if (uri.startsWith('ipfs://')) {
    const cid = uri.replace('ipfs://', '');
    return `${appConfig.storage.pinataGateway}/ipfs/${cid}`;
  }
  return uri;
}
