import { NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

export async function middleware(request: Request) {
  console.log("Middleware is running");
  const session = await getSession();

  if (session) {
    return NextResponse.next();
  } else {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.headers.set(
      "X-Unauthorized",
      "You are not authorized to access this page."
    );
    return response;
  }
}

export const config = {
  matcher: ["/((?!signin|public).*)"],
};
