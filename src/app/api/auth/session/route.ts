import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const cookieStore = request.headers.get("cookie") || "";

  const session = await getSession();
  const userId = session.id;

  if (userId) {
    return NextResponse.json({ isLoggedIn: true, userId: userId });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
