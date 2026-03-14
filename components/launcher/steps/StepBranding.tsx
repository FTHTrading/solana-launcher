'use client';

import { useCallback, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { TokenFormData } from '@/lib/validation/token-schemas';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { appConfig } from '@/lib/config/app-config';
import { ImageIcon, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface StepBrandingProps {
  form: UseFormReturn<TokenFormData>;
}

export function StepBranding({ form }: StepBrandingProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const [preview, setPreview] = useState<string | null>(null);
  const imageFile = watch('image');

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setValue('image', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  const clearImage = useCallback(() => {
    setValue('image', undefined as unknown as File, { shouldValidate: false });
    setPreview(null);
  }, [setValue]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Branding & Links</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add your token image, description, and optional community links.
        </p>
      </div>

      {/* Image upload */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-foreground">
          Token Image <span className="text-destructive">*</span>
        </label>
        <div className="flex items-start gap-4">
          {/* Preview */}
          <div
            className={cn(
              'h-24 w-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center flex-shrink-0 overflow-hidden',
              preview ? 'border-solid border-brand-500/50' : 'bg-muted/30'
            )}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Token preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
            )}
          </div>

          {/* Upload controls */}
          <div className="flex-1 space-y-2">
            <label
              htmlFor="image-upload"
              className="flex items-center gap-2 cursor-pointer inline-flex h-9 px-4 rounded-lg border border-border bg-background text-sm hover:bg-muted/50 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {imageFile ? 'Change Image' : 'Upload Image'}
            </label>
            <input
              id="image-upload"
              type="file"
              accept={appConfig.token.allowedImageTypes.join(',')}
              className="sr-only"
              onChange={handleFileChange}
            />
            {preview && (
              <button
                type="button"
                onClick={clearImage}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="h-3 w-3" /> Remove
              </button>
            )}
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF, or WebP. Max {appConfig.token.maxImageSizeMB}MB. 
              Recommend 1:1 ratio, min 200×200px.
            </p>
          </div>
        </div>
        {errors.image && (
          <p className="text-xs text-destructive">{errors.image.message as string}</p>
        )}
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Describe what your token is about..."
        error={errors.description?.message}
        hint={`Max ${appConfig.token.maxDescriptionLength} characters.`}
        required
        {...register('description')}
      />

      {/* Social links */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Social Links (optional)</p>
        <div className="grid gap-3">
          <Input
            label="Website"
            placeholder="https://yourtoken.com"
            error={errors.website?.message}
            {...register('website')}
          />
          <Input
            label="X / Twitter"
            placeholder="https://x.com/yourtoken"
            error={errors.twitter?.message}
            {...register('twitter')}
          />
          <Input
            label="Telegram"
            placeholder="https://t.me/yourtoken"
            error={errors.telegram?.message}
            {...register('telegram')}
          />
          <Input
            label="Discord"
            placeholder="https://discord.gg/yourtoken"
            error={errors.discord?.message}
            {...register('discord')}
          />
        </div>
      </div>
    </div>
  );
}
