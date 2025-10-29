import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch single student by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    )
  }
}

// PUT - Update student
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, nis, quote, avatar } = body

    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Update student information
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(nis && { nis }),
        ...(quote && { quote }),
        ...(avatar && { avatar })
      }
    })

    return NextResponse.json(updatedStudent)
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE - Delete student
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Delete student
    await prisma.student.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}