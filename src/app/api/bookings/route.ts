import { NextRequest, NextResponse } from "next/server"
import { auth }   from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const bookings = await prisma.booking.findMany({
    where:   { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(bookings)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { type, details, totalPrice } = await req.json()

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      type,
      details,
      totalPrice,
      status: "CONFIRMED",
    }
  })

  return NextResponse.json(booking, { status: 201 })
}