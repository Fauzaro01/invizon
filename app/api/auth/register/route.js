import { NextResponse } from 'next/server'
import { UserService } from '@/lib/services'

export async function POST(request) {
  try {
    const { username, email, password, name } = await request.json()

    // Validation
    if (!username || !email || !password || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { prisma } = await import('@/lib/services')
    
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Username or email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = await UserService.createUser({
      username,
      email,
      password,
      name,
      role: 'USER' // Default role
    })

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Username or email already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}