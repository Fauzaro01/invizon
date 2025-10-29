import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch single gallery image by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    const image = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    )
  }
}

// PUT - Update gallery image
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { title, imageUrl, alt, category, description } = body

    const existingImage = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingImage) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      )
    }

    // Validate category enum if provided
    if (category) {
      const validCategories = ['CLASS', 'EVENTS', 'TRIPS', 'ACHIEVEMENTS']
      const upperCategory = category.toUpperCase()
      
      if (!validCategories.includes(upperCategory)) {
        return NextResponse.json(
          { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
          { status: 400 }
        )
      }
    }

    const updatedImage = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(imageUrl && { imageUrl }),
        ...(alt && { alt }),
        ...(category && { category: category.toUpperCase() }),
        ...(description !== undefined && { description })
      }
    })

    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery image
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    const existingImage = await prisma.gallery.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingImage) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      )
    }

    await prisma.gallery.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Gallery image deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    )
  }
}