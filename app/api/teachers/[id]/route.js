import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch single teacher by ID
export async function GET(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const teacher = await prisma.teacher.findUnique({
      where: { id: id }
    })

    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(teacher)
  } catch (error) {
    console.error('Error fetching teacher:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teacher' },
      { status: 500 }
    )
  }
}

// PUT - Update teacher
export async function PUT(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    const body = await request.json()
    const { nip, name, subject, bio, avatar, role } = body

    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: id }
    })

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    // If NIP is being changed, check if new NIP already exists
    if (nip && nip !== existingTeacher.nip) {
      const nipExists = await prisma.teacher.findUnique({
        where: { nip }
      })

      if (nipExists) {
        return NextResponse.json(
          { error: 'Teacher with this NIP already exists' },
          { status: 400 }
        )
      }
    }

    const updatedTeacher = await prisma.teacher.update({
      where: { id: id },
      data: {
        ...(nip && { nip }),
        ...(name && { name }),
        ...(subject !== undefined && { subject }),
        ...(bio !== undefined && { bio }),
        ...(avatar !== undefined && { avatar }),
        ...(role && { role })
      }
    })

    return NextResponse.json(updatedTeacher)
  } catch (error) {
    console.error('Error updating teacher:', error)
    return NextResponse.json(
      { error: 'Failed to update teacher' },
      { status: 500 }
    )
  }
}

// DELETE - Delete teacher
export async function DELETE(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id: id }
    })

    if (!existingTeacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      )
    }

    await prisma.teacher.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Teacher deleted successfully' })
  } catch (error) {
    console.error('Error deleting teacher:', error)
    return NextResponse.json(
      { error: 'Failed to delete teacher' },
      { status: 500 }
    )
  }
}
