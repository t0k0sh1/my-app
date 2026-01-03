import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上である必要があります"),
})

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(1, "パスワードを入力してください")
      .min(8, "パスワードは8文字以上である必要があります")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "パスワードは大文字、小文字、数字を含む必要があります"
      ),
    confirmPassword: z.string().min(1, "パスワード(確認)を入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  })

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
