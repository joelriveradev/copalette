import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/palettes',
  '/palette/(.*)',
  '/discover',
  '/featured'
])

export default clerkMiddleware((auth, request) => {
  const { protect } = auth()
  if (isProtectedRoute(request)) protect()
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
