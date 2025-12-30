import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch all teachers
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(teachers)
  } catch (error) {
    console.error('Error fetching teachers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teachers' },
      { status: 500 }
    )
  }
}

// POST - Create new teacher
export async function POST(request) {
  try {
    const body = await request.json()
    const { nip, name, subject, bio, avatar, role } = body

    // Validate required fields
    if (!nip || !name) {
      return NextResponse.json(
        { error: 'NIP and name are required' },
        { status: 400 }
      )
    }

    // Check if NIP already exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { nip }
    })

    if (existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher with this NIP already exists' },
        { status: 400 }
      )
    }

    const newTeacher = await prisma.teacher.create({
      data: {
        nip,
        name,
        subject: subject || null,
        bio: bio || null,
        avatar: avatar || null,
        role: role || 'Class Leader Teacher'
      }
    })

    return NextResponse.json(newTeacher, { status: 201 })
  } catch (error) {
    console.error('Error creating teacher:', error)
    return NextResponse.json(
      { error: 'Failed to create teacher' },
      { status: 500 }
    )
  }
}
