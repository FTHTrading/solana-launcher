'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { appConfig } from '@/lib/config/app-config';

const FAQ_ITEMS = [
  {
    q: 'What is an SPL token?',
    a: 'An SPL token is the Solana equivalent of an ERC-20 token on Ethereum. It is a fungible token running on the Solana blockchain. You can set the name, symbol, supply, decimals, and attach metadata (image, description, links) to it.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. This platform handles all the on-chain interaction for you. You fill in a simple form, upload your token image, review the details, and confirm the transaction in your wallet. That\'s it.',
  },
  {
    q: 'How much does it cost to launch a token?',
    a: `The platform fee is ${appConfig.fees.creationFeeSOL} SOL, plus approximately ${appConfig.fees.estimatedNetworkFeeSOL} SOL for Solana network fees and account rent. The total is displayed clearly before you sign anything.`,
  },
  {
    q: 'What wallets are supported?',
    a: 'Phantom and Solflare are supported out of the box. These are the most widely used Solana wallets and both are non-custodial — your private keys stay in your wallet, never on this server.',
  },
  {
    q: 'Can I test before going live?',
    a: 'Yes. The platform runs on Devnet by default, which uses test SOL. You can get free Devnet SOL from the Solana faucet at faucet.solana.com. When you are ready to launch on Mainnet, switch your wallet network to Mainnet-Beta.',
  },
  {
    q: 'Where is my token image stored?',
    a: 'Token images and metadata are uploaded to IPFS — a decentralized file storage network. The content-addressed IPFS URI is attached to your token\'s on-chain metadata so it is permanently accessible.',
  },
  {
    q: 'Do you hold my tokens or have access to my wallet?',
    a: 'No. This is a non-custodial tool. You sign every transaction yourself with your wallet. We never request, store, or access your private keys.',
  },
  {
    q: 'Can I burn tokens after launch?',
    a: 'Yes. The dashboard includes a burn flow where you can send tokens to the burn address, permanently removing them from circulation.',
  },
  {
    q: 'Is there a legal risk to launching a token?',
    a: 'Token launchers can have significant regulatory implications depending on your jurisdiction, how the token is distributed, and whether it is marketed as an investment. This tool is infrastructure software only. You are solely responsible for ensuring your launch complies with all applicable laws. This is not legal advice — consult a qualified attorney before launching.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className="border border-border rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <span>{item.q}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200',
                openIdx === idx && 'rotate-180'
              )}
            />
          </button>
          {openIdx === idx && (
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
