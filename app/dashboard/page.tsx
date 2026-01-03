import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ダッシュボード</CardTitle>
          <CardDescription>認証に成功しました</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-950">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              ようこそ！
            </h3>
            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              {session.user?.email}
            </p>
            {session.user?.name && (
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                {session.user.name}
              </p>
            )}
          </div>

          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button type="submit" variant="outline" className="w-full">
              ログアウト
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
