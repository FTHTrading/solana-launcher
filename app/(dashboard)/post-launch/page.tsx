import { PostLaunchClient } from '@/components/ecosystem/PostLaunchClient';

export const metadata = {
  title: 'Post-Launch Automation',
  description: 'Configure webhooks, notifications, and automated workflows for your launched tokens.',
};

export default function PostLaunchPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <PostLaunchClient />
    </div>
  );
}
