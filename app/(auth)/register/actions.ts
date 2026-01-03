"use server"

import { createUser } from "@/lib/db"
import { registerSchema } from "@/lib/auth-schema"

export async function registerUser(data: {
  email: string
  password: string
  confirmPassword: string
}) {
  const validated = registerSchema.safeParse(data)

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    }
  }

  try {
    await createUser(validated.data.email, validated.data.password)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "登録に失敗しました",
    }
  }
}
