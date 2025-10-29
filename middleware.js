import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin route protection
    if (pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    // Redirect authenticated users from auth pages
    if (pathname.startsWith('/auth/') && token) {
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      }
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle the logic
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*'
  ]
}