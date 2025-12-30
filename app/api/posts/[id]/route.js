import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { slugify, generateUniqueSlug } from '@/lib/slugify'

const prisma = new PrismaClient()

// GET - Fetch single post by ID
export async function GET(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const post = await prisma.post.findUnique({
      where: { id: id },
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

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PUT - Update post
export async function PUT(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    const body = await request.json()
    const { title, content, excerpt, imageUrl, category, isPublished } = body

    const existingPost = await prisma.post.findUnique({
      where: { id: id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Validate category enum if provided
    if (category) {
      const validCategories = ['NEWS', 'EVENTS', 'ACHIEVEMENTS', 'ANNOUNCEMENTS']
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Generate new slug if title is being updated
    let newSlug = existingPost.slug
    if (title && title !== existingPost.title) {
      const baseSlug = slugify(title)
      newSlug = await generateUniqueSlug(baseSlug, async (checkSlug) => {
        const post = await prisma.post.findUnique({
          where: { slug: checkSlug }
        })
        return !!post && post.id !== id // Exclude current post from uniqueness check
      })
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        ...(title && { title, slug: newSlug }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(category && { category }),
        ...(isPublished !== undefined && { isPublished })
      }
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete post
export async function DELETE(request, props) {
  const params = await props.params;
  try {
    const { id } = params
    
    const existingPost = await prisma.post.findUnique({
      where: { id: id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Delete post (cascade will delete comments)
    await prisma.post.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
