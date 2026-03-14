'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Bell,
  Bot,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Globe,
  Mail,
  MessageSquare,
  Radio,
  Send,
  Settings,
  Shield,
  Webhook,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { WalletGuard } from '@/components/wallet/WalletGuard';
import { appConfig } from '@/lib/config/app-config';

interface NotificationChannel {
  id: string;
  type: 'discord' | 'telegram' | 'email' | 'sms';
  label: string;
  icon: React.ReactNode;
  description: string;
  configured: boolean;
  configUrl: string;
  features: string[];
}

const CHANNELS: NotificationChannel[] = [
  {
    id: 'discord',
    type: 'discord',
    label: 'Discord',
    icon: <MessageSquare className="h-5 w-5" />,
    description:
      'Push token launch alerts, price movements, and pool activity to a Discord channel via webhook.',
    configured: false,
    configUrl: 'https://discord.com/developers/docs/resources/webhook',
    features: [
      'Launch confirmation alerts',
      'Pool creation notifications',
      'Large transfer alerts (whale watching)',
      'Custom embed formatting',
    ],
  },
  {
    id: 'telegram',
    type: 'telegram',
    label: 'Telegram',
    icon: <Send className="h-5 w-5" />,
    description:
      'Send real-time alerts to a Telegram bot or group. Perfect for on-the-go monitoring.',
    configured: false,
    configUrl: 'https://core.telegram.org/bots/api',
    features: [
      'Instant launch notifications',
      'Price change alerts',
      'Wallet activity monitoring',
      'Group chat integration',
    ],
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    icon: <Mail className="h-5 w-5" />,
    description:
      'Receive digest emails for token events. Good for daily summaries and important alerts.',
    configured: false,
    configUrl: '#',
    features: [
      'Daily/weekly digest reports',
      'Critical event alerts',
      'Portfolio value updates',
      'HTML-formatted reports',
    ],
  },
  {
    id: 'sms',
    type: 'sms',
    label: 'SMS (Donk AI)',
    icon: <Bot className="h-5 w-5" />,
    description:
      'Powered by Donk AI — get voice or SMS alerts via Telnyx for critical token events.',
    configured: false,
    configUrl: '#',
    features: [
      'Voice call alerts for emergencies',
      'SMS notifications anywhere',
      'AI-powered event summaries',
      'Natural language reporting',
    ],
  },
];

const HELIUS_EVENTS = [
  { id: 'transfer', label: 'Token Transfers', description: 'Any transfer of your token between wallets' },
  { id: 'whale', label: 'Whale Alerts', description: 'Transfers above a configurable threshold' },
  { id: 'pool', label: 'Pool Activity', description: 'New liquidity pools created for your token' },
  { id: 'swap', label: 'Swap Activity', description: 'Trades on any DEX involving your token' },
  { id: 'burn', label: 'Token Burns', description: 'Any token burn events' },
  { id: 'authority', label: 'Authority Changes', description: 'Mint/freeze authority revocations' },
];

export function PostLaunchClient() {
  const { connected } = useWallet();
  const [mintAddress, setMintAddress] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [activeEvents, setActiveEvents] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (!connected) {
    return (
      <WalletGuard
        icon={<Bell className="h-6 w-6 text-brand-500" />}
        title="Connect Your Wallet"
        description="Connect your Solana wallet to set up post-launch automation."
      >
        <></>
      </WalletGuard>
    );
  }

  const toggleEvent = (id: string) => {
    setActiveEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const examplePayload = {
    event: 'token_transfer',
    mint: mintAddress || '<TOKEN_MINT_ADDRESS>',
    from: '9WzDX...',
    to: '7kFpA...',
    amount: '1000000',
    timestamp: new Date().toISOString(),
    signature: '5xYzA...',
  };

  const copyPayload = async () => {
    await navigator.clipboard.writeText(JSON.stringify(examplePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-amber-500/20 flex items-center justify-center">
            <Bell className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Post-Launch Automation</h1>
            <p className="text-sm text-muted-foreground">
              Configure webhooks, notifications, and automated workflows
            </p>
          </div>
        </div>
      </div>

      {/* Token selection */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Input
            label="Token Mint Address"
            placeholder="Paste your launched token mint address..."
            value={mintAddress}
            onChange={(e) => setMintAddress(e.target.value)}
            hint="Monitoring will track all on-chain activity for this token"
          />
        </CardContent>
      </Card>

      {/* Helius Webhook Setup */}
      <Card className="border-brand-500/30">
        <CardHeader className="bg-gradient-to-r from-brand-500/5 to-amber-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-brand-500" />
              <CardTitle className="text-base">Helius Webhook</CardTitle>
              <Badge variant="info">Real-time</Badge>
            </div>
            {appConfig.ecosystem.helius.rpcUrl ? (
              <Badge variant="success" className="text-[10px]">
                <Radio className="h-3 w-3 mr-1" />
                RPC Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[10px]">Not configured</Badge>
            )}
          </div>
          <CardDescription>
            Helius webhooks deliver real-time on-chain events to your endpoint.
            No polling needed — get notified instantly when anything happens with your token.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <Input
            label="Webhook Endpoint URL"
            placeholder="https://your-api.com/webhook/solana"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            hint="POST endpoint that will receive JSON payloads for each event"
          />

          {/* Event selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Events to monitor:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HELIUS_EVENTS.map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => toggleEvent(evt.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    activeEvents.includes(evt.id)
                      ? 'border-brand-500 bg-brand-500/5'
                      : 'border-border hover:border-brand-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {activeEvents.includes(evt.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-brand-500 flex-shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{evt.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">{evt.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Example payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Example webhook payload:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyPayload}
                className="h-7"
              >
                {copied ? (
                  <><CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" />Copied</>
                ) : (
                  <><Copy className="h-3 w-3 mr-1" />Copy</>
                )}
              </Button>
            </div>
            <pre className="rounded-lg bg-muted/50 border p-3 text-xs font-mono overflow-x-auto">
              {JSON.stringify(examplePayload, null, 2)}
            </pre>
          </div>

          <div className="flex gap-2">
            <Button
              variant="gradient"
              disabled={
                !mintAddress || !webhookUrl || activeEvents.length === 0
              }
            >
              <Zap className="h-4 w-4 mr-2" />
              Save Webhook Configuration
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open('https://docs.helius.dev/webhooks/webhooks-summary', '_blank')
              }
            >
              Helius Docs
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </Button>
          </div>

          <Alert variant="info" title="How it works">
            <p className="text-xs mt-1">
              When configured, Helius monitors the Solana blockchain for any
              transactions involving your token mint and POSTs a JSON payload
              to your endpoint within seconds. Use this to trigger Discord bots,
              update dashboards, or alert your community.
            </p>
          </Alert>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Notification Channels</h2>
          <Badge variant="secondary">Coming Soon</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHANNELS.map((ch) => (
            <Card
              key={ch.id}
              className="group hover:border-brand-500/30 transition-colors"
            >
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground">
                    {ch.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{ch.label}</p>
                      {ch.configured ? (
                        <Badge variant="success" className="text-[10px]">Active</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">Setup Required</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{ch.description}</p>
                <ul className="space-y-1">
                  {ch.features.map((f) => (
                    <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-muted-foreground/50 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  <Settings className="h-3 w-3 mr-1.5" />
                  Configure {ch.label}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Automation Pipeline */}
      <Card className="bg-gradient-to-r from-brand-500/5 to-purple-500/5 border-brand-500/20">
        <CardContent className="pt-6 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-brand-500" />
            <div>
              <p className="font-semibold text-sm">Automation Pipeline</p>
              <p className="text-xs text-muted-foreground">
                Chain webhooks + notifications together for fully automated post-launch workflows
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { icon: <Globe className="h-3.5 w-3.5" />, label: 'On-chain Event' },
              { icon: <Webhook className="h-3.5 w-3.5" />, label: 'Helius Webhook' },
              { icon: <Shield className="h-3.5 w-3.5" />, label: 'Your Backend' },
              { icon: <Bell className="h-3.5 w-3.5" />, label: 'Notifications' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs font-medium whitespace-nowrap">
                  {step.icon}
                  {step.label}
                </div>
                {i < 3 && (
                  <div className="text-muted-foreground">→</div>
                )}
              </div>
            ))}
          </div>

          <Alert variant="info" title="Full pipeline example">
            <p className="text-xs mt-1">
              Token transfer detected → Helius fires webhook → Your backend processes
              it → Sends Discord embed + Telegram message + email digest. All within
              seconds of the on-chain event.
            </p>
          </Alert>
        </CardContent>
      </Card>

      {/* Timing */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-medium">Webhook latency</p>
              <p className="text-muted-foreground leading-relaxed">
                Helius webhooks typically fire within 1-5 seconds of transaction
                confirmation. Enhanced webhooks (paid tier) can fire on first
                confirmation for sub-second alerts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
