import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch single achievement by ID
export async function GET(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const achievement = await prisma.achievement.findUnique({
      where: { id: id },
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
      }
    })

    if (!achievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(achievement)
  } catch (error) {
    console.error('Error fetching achievement:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievement' },
      { status: 500 }
    )
  }
}

// PUT - Update achievement
export async function PUT(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    const body = await request.json()
    const { title, description, year, date, imageUrl, icon, category, studentIds = [] } = body

    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: id }
    })

    if (!existingAchievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      )
    }

    // Validate category enum if provided
    if (category) {
      const validCategories = ['ACADEMIC', 'SPORTS', 'ARTS', 'TECHNOLOGY', 'MILESTONE']
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Update achievement
    const updatedAchievement = await prisma.achievement.update({
      where: { id: id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(year && { year: parseInt(year) }),
        ...(date && { date: new Date(date) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(icon && { icon }),
        ...(category && { category })
      }
    })

    // Update student associations
    if (studentIds !== undefined) {
      // Delete existing associations
      await prisma.studentAchievement.deleteMany({
        where: { achievementId: id }
      })

      // Create new associations
      if (studentIds.length > 0) {
        await prisma.studentAchievement.createMany({
          data: studentIds.map(studentId => ({
            studentId: studentId,
            achievementId: id
          }))
        })
      }
    }

    return NextResponse.json(updatedAchievement)
  } catch (error) {
    console.error('Error updating achievement:', error)
    return NextResponse.json(
      { error: 'Failed to update achievement' },
      { status: 500 }
    )
  }
}

// DELETE - Delete achievement
export async function DELETE(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const existingAchievement = await prisma.achievement.findUnique({
      where: { id: id }
    })

    if (!existingAchievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      )
    }

    // Delete achievement (cascade will delete student associations)
    await prisma.achievement.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Achievement deleted successfully' })
  } catch (error) {
    console.error('Error deleting achievement:', error)
    return NextResponse.json(
      { error: 'Failed to delete achievement' },
      { status: 500 }
    )
  }
}
