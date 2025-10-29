import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch achievements with optional year filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    
    const whereClause = year ? { year: parseInt(year) } : {}

    const achievements = await prisma.achievement.findMany({
      where: whereClause,
      include: {
        students: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                nis: true
              }
            }
          }
        }
      },
      orderBy: [
        { year: 'desc' },
        { date: 'desc' }
      ]
    })

    // Group by year for frontend
    const groupedByYear = achievements.reduce((acc, achievement) => {
      const yearKey = achievement.year
      if (!acc[yearKey]) {
        acc[yearKey] = []
      }
      
      acc[yearKey].push({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        date: achievement.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long", 
          day: "numeric"
        }),
        image: achievement.imageUrl,
        icon: achievement.icon,
        category: achievement.category,
        students: achievement.students.map(sa => sa.student)
      })
      
      return acc
    }, {})

    return NextResponse.json(groupedByYear)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

// POST - Create new achievement
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, year, date, imageUrl, icon, category, studentIds = [] } = body

    // Validate required fields
    if (!title || !description || !year) {
      return NextResponse.json(
        { error: 'Title, description, and year are required' },
        { status: 400 }
      )
    }

    // Validate category enum
    const validCategories = ['ACADEMIC', 'SPORTS', 'ARTS', 'TECHNOLOGY', 'MILESTONE']
    if (category && !validCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      )
    }

    const newAchievement = await prisma.achievement.create({
      data: {
        title,
        description,
        year: parseInt(year),
        date: date ? new Date(date) : new Date(),
        imageUrl: imageUrl || '/gambar.webp',
        icon: icon || '🏆',
        category: category || 'MILESTONE'
      }
    })

    // Create student-achievement relations if studentIds provided
    if (studentIds.length > 0) {
      await prisma.studentAchievement.createMany({
        data: studentIds.map(studentId => ({
          studentId: parseInt(studentId),
          achievementId: newAchievement.id
        }))
      })
    }

    return NextResponse.json(newAchievement, { status: 201 })
  } catch (error) {
    console.error('Error creating achievement:', error)
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    )
  }
}