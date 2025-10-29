import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/session'
import { prisma } from '@/lib/services'

export async function GET() {
  try {
    // Check if user is admin
    await requireAdmin()

    // Get counts
    const [students, posts, teachers, achievements, gallery, comments] = await Promise.all([
      prisma.student.count(),
      prisma.post.count(),
      prisma.teacher.count(),
      prisma.achievement.count(),
      prisma.gallery.count(),
      prisma.comment.count()
    ])

    return NextResponse.json({
      students,
      posts,
      teachers,
      achievements,
      gallery,
      comments
    })

  } catch (error) {
    console.error('Stats error:', error)
    
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