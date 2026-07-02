import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/readings(.*)",
  "/journal(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/favorites(.*)",
  "/daily(.*)",
  "/deck(.*)",
  "/meditation(.*)",
  "/compatibility(.*)",
  "/crystals(.*)",
  "/api/readings(.*)",
  "/api/journal(.*)",
  "/api/favorites(.*)",
  "/api/users(.*)",
  "/api/notifications(.*)",
  "/api/stripe/checkout(.*)",
  "/api/stripe/portal(.*)",
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect authenticated routes - DISABLED FOR TESTING
  // if (isProtectedRoute(req)) {
  //   await auth.protect();
  // }

  // Protect admin routes — require admin role
  if (isAdminRoute(req)) {
    await auth.protect();
    // Additional admin role check happens in the admin layout/API routes
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
