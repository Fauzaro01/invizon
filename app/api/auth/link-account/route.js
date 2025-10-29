import { NextResponse } from 'next/server'
import { prisma } from '@/lib/services'

// GET - Fetch linking data by token
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      )
    }

    // Get pending link request from global storage (in production, use Redis or database)
    global.pendingLinkRequests = global.pendingLinkRequests || new Map()
    const linkRequest = global.pendingLinkRequests.get(token)

    if (!linkRequest) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 404 }
      )
    }

    // Check if token is expired (24 hours)
    const isExpired = Date.now() - linkRequest.timestamp > 24 * 60 * 60 * 1000
    if (isExpired) {
      global.pendingLinkRequests.delete(token)
      return NextResponse.json(
        { message: 'Token has expired' },
        { status: 410 }
      )
    }

    // Return linking data (without sensitive information)
    return NextResponse.json({
      userInfo: linkRequest.userInfo,
      provider: linkRequest.newAccount.provider
    })

  } catch (error) {
    console.error('Link account fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Handle linking decision
export async function POST(request) {
  try {
    const { token, action } = await request.json()

    if (!token || !action) {
      return NextResponse.json(
        { message: 'Token and action are required' },
        { status: 400 }
      )
    }

    if (!['link', 'decline'].includes(action)) {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400 }
      )
    }

    // Get pending link request
    global.pendingLinkRequests = global.pendingLinkRequests || new Map()
    const linkRequest = global.pendingLinkRequests.get(token)

    if (!linkRequest) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 404 }
      )
    }

    // Check if token is expired
    const isExpired = Date.now() - linkRequest.timestamp > 24 * 60 * 60 * 1000
    if (isExpired) {
      global.pendingLinkRequests.delete(token)
      return NextResponse.json(
        { message: 'Token has expired' },
        { status: 410 }
      )
    }

    if (action === 'link') {
      // Link the Google account to existing user
      try {
        await prisma.account.create({
          data: {
            userId: linkRequest.existingUserId,
            type: linkRequest.newAccount.type,
            provider: linkRequest.newAccount.provider,
            providerAccountId: linkRequest.newAccount.providerAccountId,
            refresh_token: linkRequest.newAccount.refresh_token,
            access_token: linkRequest.newAccount.access_token,
            expires_at: linkRequest.newAccount.expires_at,
          }
        })

        // Update user info if needed (e.g., if name or image is missing)
        const existingUser = await prisma.user.findUnique({
          where: { id: linkRequest.existingUserId }
        })

        const updateData = {}
        if (!existingUser.name && linkRequest.userInfo.name) {
          updateData.name = linkRequest.userInfo.name
        }
        if (!existingUser.image && linkRequest.userInfo.image) {
          updateData.image = linkRequest.userInfo.image
        }
        if (!existingUser.emailVerified) {
          updateData.emailVerified = new Date()
        }

        if (Object.keys(updateData).length > 0) {
          await prisma.user.update({
            where: { id: linkRequest.existingUserId },
            data: updateData
          })
        }

        // Clean up
        global.pendingLinkRequests.delete(token)

        return NextResponse.json({
          message: 'Accounts linked successfully'
        })

      } catch (dbError) {
        console.error('Database error during linking:', dbError)
        return NextResponse.json(
          { message: 'Failed to link accounts' },
          { status: 500 }
        )
      }
    }

    if (action === 'decline') {
      // Just clean up the pending request
      global.pendingLinkRequests.delete(token)
      
      return NextResponse.json({
        message: 'Linking declined'
      })
    }

  } catch (error) {
    console.error('Link account processing error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}