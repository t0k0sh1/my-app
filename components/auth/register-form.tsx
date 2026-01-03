"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput } from "@/lib/auth-schema"
import { registerUser } from "@/app/(auth)/register/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setError("")

    const result = await registerUser(data)

    if (!result.success) {
      setError(result.message || "登録に失敗しました")
    } else {
      router.push("/login?registered=true")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>新規登録</CardTitle>
        <CardDescription>新しいアカウントを作成してください</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="大文字、小文字、数字を含む8文字以上"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード（確認）</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "登録中..." : "登録"}
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            既にアカウントをお持ちですか？{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ログイン
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
