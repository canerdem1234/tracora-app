import { z } from "zod";

// RFC 5321 uyumlu email doğrulama
const emailSchema = z
  .string()
  .min(1, "Email zorunlu")
  .max(254, "Email çok uzun")
  .email("Geçerli bir email adresi girin")
  .toLowerCase()
  .trim();

// Şifre politikası: min 8, büyük harf, rakam, özel karakter
const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalı")
  .max(128, "Şifre çok uzun")
  .regex(/[A-Z]/, "En az bir büyük harf içermeli")
  .regex(/[0-9]/, "En az bir rakam içermeli")
  .regex(/[^A-Za-z0-9]/, "En az bir özel karakter içermeli (!@#$% vb.)");

// Waitlist formu
export const waitlistSchema = z.object({
  email: emailSchema,
});

// Kullanıcı kaydı
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

// Kullanıcı girişi
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Şifre zorunlu").max(128),
});

// Marka oluşturma
export const brandSchema = z.object({
  name: z
    .string()
    .min(1, "Marka adı zorunlu")
    .max(100, "Marka adı çok uzun")
    .trim(),
  keywords: z
    .array(z.string().max(50).trim())
    .min(1, "En az 1 anahtar kelime girin")
    .max(10, "En fazla 10 anahtar kelime"),
  competitors: z
    .array(z.string().max(100).trim())
    .max(5, "En fazla 5 rakip")
    .optional()
    .default([]),
});

// AI sorgusu
export const querySchema = z.object({
  brandId: z.string().uuid("Geçersiz marka ID"),
  aiEngine: z.enum(["chatgpt", "perplexity", "gemini", "claude", "grok"]).refine(
    (v) => ["chatgpt", "perplexity", "gemini", "claude", "grok"].includes(v),
    { message: "Geçersiz AI motoru" }
  ),
  prompt: z
    .string()
    .min(1, "Sorgu zorunlu")
    .max(500, "Sorgu çok uzun (max 500 karakter)")
    .trim()
    // Prompt injection koruması: şüpheli komutları engelle
    .refine(
      (val) => {
        const injectionPatterns = [
          /ignore\s+(previous|all|prior)\s+instructions/i,
          /system\s*prompt/i,
          /you\s+are\s+now/i,
          /forget\s+(everything|all|your)/i,
          /act\s+as\s+(if|a|an)/i,
          /jailbreak/i,
          /dan\s+mode/i,
        ];
        return !injectionPatterns.some((pattern) => pattern.test(val));
      },
      { message: "Geçersiz sorgu içeriği" }
    ),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type BrandInput = z.infer<typeof brandSchema>;
export type QueryInput = z.infer<typeof querySchema>;
