import { hashPassword } from "./password"

export interface User {
  id: string
  email: string
  name: string | null
  password: string
  createdAt: Date
}

// 仮のインメモリデータベース (開発用)
const users: User[] = []

// 初期ユーザーを追加 (開発用)
async function seedUsers() {
  if (users.length === 0) {
    users.push({
      id: "1",
      email: "test@example.com",
      name: "テストユーザー",
      password: await hashPassword("Password123"),
      createdAt: new Date(),
    })
  }
}

seedUsers()

export async function getUserByEmail(
  email: string
): Promise<User | undefined> {
  return users.find((user) => user.email === email)
}

export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<User> {
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new Error("このメールアドレスは既に登録されています")
  }

  const hashedPassword = await hashPassword(password)
  const newUser: User = {
    id: String(users.length + 1),
    email,
    name: name || null,
    password: hashedPassword,
    createdAt: new Date(),
  }

  users.push(newUser)
  return newUser
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id)
}
