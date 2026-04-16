import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("tracely_token")?.value;

  let isValid = false;
  if (token) {
    const payload = await verifyToken(token);
    isValid = payload !== null;
  }

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register") ||
    request.nextUrl.pathname.startsWith("/forgot-password");

  // token invalido y no es ruta de auth
  if (!isValid && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // si esta logeado, no puede ver login
  if (isValid && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
