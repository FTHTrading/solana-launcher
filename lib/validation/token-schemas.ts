import { z } from 'zod';
import { appConfig } from '@/lib/config/app-config';

const { token } = appConfig;

// =============================================
// TOKEN FORM VALIDATION SCHEMAS
// =============================================

export const tokenDetailsSchema = z.object({
  name: z
    .string()
    .min(1, 'Token name is required')
    .max(token.maxNameLength, `Name must be ${token.maxNameLength} characters or less`)
    .regex(/^[a-zA-Z0-9\s._-]+$/, 'Name can only contain letters, numbers, spaces, and . _ -'),

  symbol: z
    .string()
    .min(1, 'Token symbol is required')
    .max(token.maxSymbolLength, `Symbol must be ${token.maxSymbolLength} characters or less`)
    .regex(/^[A-Z0-9]+$/, 'Symbol must be uppercase letters and numbers only')
    .transform((v) => v.toUpperCase()),

  decimals: z
    .number({
      required_error: 'Decimals is required',
      invalid_type_error: 'Decimals must be a number',
    })
    .int('Decimals must be a whole number')
    .min(token.minDecimals, `Decimals must be at least ${token.minDecimals}`)
    .max(token.maxDecimals, `Decimals must be at most ${token.maxDecimals}`),

  totalSupply: z
    .string()
    .min(1, 'Total supply is required')
    .regex(/^\d+$/, 'Supply must be a positive whole number')
    .refine(
      (v) => BigInt(v) > 0n,
      'Supply must be greater than 0'
    )
    .refine(
      (v) => BigInt(v) <= 10n ** 18n,
      'Supply is too large (max 10^18)'
    ),
});

export const tokenBrandingSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .max(token.maxDescriptionLength, `Description must be ${token.maxDescriptionLength} characters or less`),

  website: z
    .string()
    .url('Must be a valid URL (include https://)')
    .optional()
    .or(z.literal('')),

  twitter: z
    .string()
    .url('Must be a valid URL (e.g. https://x.com/yourtoken)')
    .optional()
    .or(z.literal('')),

  telegram: z
    .string()
    .url('Must be a valid URL (e.g. https://t.me/yourtoken)')
    .optional()
    .or(z.literal('')),

  discord: z
    .string()
    .url('Must be a valid URL (e.g. https://discord.gg/yourtoken)')
    .optional()
    .or(z.literal('')),
});

export const tokenFormSchema = tokenDetailsSchema.merge(tokenBrandingSchema).extend({
  image: z
    .custom<File>((v) => v instanceof File, 'Token image is required')
    .refine(
      (f: File) => (token.allowedImageTypes as readonly string[]).includes(f.type),
      `Image must be one of: ${token.allowedImageTypes.join(', ')}`
    )
    .refine(
      (f: File) => f.size <= token.maxImageSizeMB * 1024 * 1024,
      `Image must be smaller than ${token.maxImageSizeMB}MB`
    ),
});

export const burnTokenSchema = z.object({
  mintAddress: z
    .string()
    .min(32, 'Invalid mint address')
    .max(44, 'Invalid mint address'),

  amount: z
    .string()
    .min(1, 'Amount is required')
    .regex(/^\d+$/, 'Amount must be a positive whole number')
    .refine((v) => BigInt(v) > 0n, 'Amount must be greater than 0'),
});

// Inferred types
export type TokenDetailsFormData = z.infer<typeof tokenDetailsSchema>;
export type TokenBrandingFormData = z.infer<typeof tokenBrandingSchema>;
export type TokenFormData = z.infer<typeof tokenFormSchema>;
export type BurnTokenFormData = z.infer<typeof burnTokenSchema>;
