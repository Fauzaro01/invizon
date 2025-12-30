import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch all posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const whereClause = {
      isPublished: true,
      ...(category && category !== 'all' && { category })
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format data for frontend compatibility
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category || "general",
      imageUrl: post.imageUrl || "/gambar.webp",
      createdAt: post.createdAt,
      author: post.author
    }))

    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create new post (admin only)
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, content, category, imageUrl, authorId, isPublished = false } = body

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      )
    }

    // Verify author exists
    const author = await prisma.user.findUnique({
      where: { id: authorId }
    })

    if (!author) {
      return NextResponse.json(
        { error: 'Author not found' },
        { status: 404 }
      )
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category: category || 'general',
        imageUrl: imageUrl || '/gambar.webp',
        authorId,
        isPublished
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}