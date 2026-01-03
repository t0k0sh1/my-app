import Image from "next/image"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 bg-white dark:bg-zinc-950 sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            認証システム
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            NextAuth.js v5 を使用した認証システムのデモです。
            {session
              ? "既にログインしています。"
              : "ログインまたは新規登録を行ってください。"}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {session ? (
            <Link href="/dashboard">
              <Button className="h-12 w-full px-5 md:w-[158px]">
                ダッシュボード
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button className="h-12 w-full px-5 md:w-[158px]">
                  ログイン
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="h-12 w-full px-5 md:w-[158px]"
                >
                  新規登録
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
