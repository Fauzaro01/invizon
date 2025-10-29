import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch all gallery images with optional category filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const whereClause = category && category !== 'all' 
      ? { category: category.toUpperCase() }
      : {}

    const galleryImages = await prisma.gallery.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format data for frontend compatibility
    const formattedImages = galleryImages.map(image => ({
      id: image.id,
      src: image.imageUrl,
      alt: image.alt || image.title,
      category: image.category.toLowerCase(),
      title: image.title,
      description: image.description
    }))

    return NextResponse.json(formattedImages)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    )
  }
}

// POST - Create new gallery image
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, imageUrl, alt, category, description } = body

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      )
    }

    // Validate category enum
    const validCategories = ['CLASS', 'EVENTS', 'TRIPS', 'ACHIEVEMENTS']
    const upperCategory = category?.toUpperCase()
    
    if (category && !validCategories.includes(upperCategory)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      )
    }

    const newImage = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        alt: alt || title,
        category: upperCategory || 'CLASS',
        description: description || ''
      }
    })

    return NextResponse.json(newImage, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    )
  }
}

// DELETE - Delete all gallery images (admin only)
export async function DELETE() {
  try {
    const result = await prisma.gallery.deleteMany()
    
    return NextResponse.json({ 
      message: `Successfully deleted ${result.count} gallery images` 
    })
  } catch (error) {
    console.error('Error deleting gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery images' },
      { status: 500 }
    )
  }
}