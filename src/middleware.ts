import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes inside the app
const protectedRoutes = ['/cabinet']

export function middleware(request: NextRequest) {
  const session = request.cookies.get('pet-portal-session')?.value
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
