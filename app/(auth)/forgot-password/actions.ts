"use server"

import { forgotPasswordSchema } from "@/lib/auth-schema"
import { getUserByEmail } from "@/lib/db"

export async function sendPasswordResetEmail(data: { email: string }) {
  const validated = forgotPasswordSchema.safeParse(data)

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  const user = await getUserByEmail(validated.data.email)

  // セキュリティ上、ユーザーの存在を明かさない
  // 実際にはメール送信処理をここに追加
  console.log(`パスワードリセットリンクを送信: ${validated.data.email}`)

  return {
    success: true,
    message: "パスワードリセットリンクをメールで送信しました",
  }
}
