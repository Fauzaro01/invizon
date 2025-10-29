import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/session'
import { AdminService, prisma } from '@/lib/services'

// GET - Fetch all students
export async function GET() {
  try {
    await requireAdmin()

    const students = await prisma.student.findMany({
      orderBy: [
        { no: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(students)

  } catch (error) {
    console.error('Students fetch error:', error)
    
    if (error.message === 'Admin access required') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new student
export async function POST(request) {
  try {
    await requireAdmin()

    const { nis, name, no, quote, avatar } = await request.json()

    if (!nis || !name) {
      return NextResponse.json(
        { message: 'NIS and name are required' },
        { status: 400 }
      )
    }

    const student = await AdminService.createStudent({
      nis,
      name,
      no: no || null,
      quote: quote || null,
      avatar: avatar || '/gambar.webp'
    })

    return NextResponse.json(student, { status: 201 })

  } catch (error) {
    console.error('Student creation error:', error)
    
    if (error.message === 'Admin access required') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Student with this NIS already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}