import { NextRequest, NextResponse } from "next/server"
import { prisma }  from "@/lib/db"
import bcrypt      from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name, email,
        password: hashed,
        profile: phone ? { create: { phone } } : undefined,
      }
    })

    return NextResponse.json({
      id:    user.id,
      name:  user.name,
      email: user.email,
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}