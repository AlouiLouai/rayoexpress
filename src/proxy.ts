import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

/**
 * Next.js 16 renamed `middleware.ts` -> `proxy.ts` (same file convention,
 * runs on the Node.js runtime by default now instead of the Edge runtime).
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

const protectedRoutes = ["/dashboard"];
const publicOnlyRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static, request-independent headers (CSP-free defaults, cache headers,
  // etc.) belong in next.config.ts's headers() instead — cheaper, and
  // eligible for CDN caching. Proxy is reserved here for logic that needs
  // per-request data: the auth redirect below.

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtectedRoute && !isPublicOnlyRoute) {
    return NextResponse.next();
  }

  // Optimistic auth check only (cookie read, no DB hit) — Proxy runs on every
  // matched request including prefetches, so keep this cheap. Re-verify the
  // session against your data source inside Server Components/Actions before
  // trusting it for anything sensitive.
  const session = await decrypt(request.cookies.get("session")?.value);

  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicOnlyRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Run on everything except static assets and image optimization files,
     * so auth redirects never block CSS/JS/images from loading.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
