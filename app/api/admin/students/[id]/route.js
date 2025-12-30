import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/session'
import { AdminService, prisma } from '@/lib/services'

// PUT - Update student
export async function PUT(request, props) {
  const params = await props.params;
  try {
    await requireAdmin()

    const { id } = params
    const { nis, name, no, quote, avatar } = await request.json()

    if (!nis || !name) {
      return NextResponse.json(
        { message: 'NIS and name are required' },
        { status: 400 }
      )
    }

    const student = await AdminService.updateStudent(id, {
      nis,
      name,
      no: no || null,
      quote: quote || null,
      avatar: avatar || '/gambar.webp'
    })

    return NextResponse.json(student)

  } catch (error) {
    console.error('Student update error:', error)
    
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

// DELETE - Delete student
export async function DELETE(request, props) {
  const params = await props.params;
  try {
    await requireAdmin()

    const { id } = params

    await AdminService.deleteStudent(id)

    return NextResponse.json(
      { message: 'Student deleted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Student deletion error:', error)
    
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