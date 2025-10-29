import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch all students and teachers
export async function GET() {
  try {
    // Fetch both students and teachers
    const students = await prisma.student.findMany({
      orderBy: {
        nis: 'asc'
      }
    })

    const teachers = await prisma.teacher.findMany()

    // Combine and format data for frontend compatibility
    const formattedData = [
      // Teachers first
      ...teachers.map(teacher => ({
        id: teacher.id,
        nis: teacher.nip,
        name: teacher.name,
        role: teacher.role || "Class Leader Teacher",
        quote: teacher.bio || "Education is the most powerful weapon which you can use to change the world.",
        avatar: teacher.avatar || "https://cdn3d.iconscout.com/3d/premium/thumb/geek-student-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--boy-man-avatar-pack-people-illustrations-4800738.png",
        isTeacher: true
      })),
      // Students
      ...students.map((student, index) => ({
        id: student.id,
        no: index + 2, // Start from 2 since teacher is 1
        nis: student.nis,
        name: student.name,
        role: student.role || "Student",
        quote: student.quote || "Belajar hari ini adalah hadiah untuk dirimu di masa depan.",
        avatar: student.avatar || "/gambar.webp"
      }))
    ]

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST - Create new student
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, nis, quote, avatar, isTeacher = false, subject, bio } = body

    // Validate required fields
    if (!name || !nis) {
      return NextResponse.json(
        { error: 'Name and NIS are required' },
        { status: 400 }
      )
    }

    let newRecord
    if (isTeacher) {
      // Check if NIP already exists
      const existingTeacher = await prisma.teacher.findUnique({
        where: { nip: nis }
      })

      if (existingTeacher) {
        return NextResponse.json(
          { error: 'Teacher with this NIP already exists' },
          { status: 400 }
        )
      }

      newRecord = await prisma.teacher.create({
        data: {
          name,
          nip: nis,
          subject: subject || 'General',
          bio: bio || quote,
          avatar
        }
      })
    } else {
      // Check if NIS already exists
      const existingStudent = await prisma.student.findUnique({
        where: { nis }
      })

      if (existingStudent) {
        return NextResponse.json(
          { error: 'Student with this NIS already exists' },
          { status: 400 }
        )
      }

      newRecord = await prisma.student.create({
        data: {
          name,
          nis,
          quote,
          avatar
        }
      })
    }

    return NextResponse.json(newRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}