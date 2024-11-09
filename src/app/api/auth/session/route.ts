import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export async function GET() {
  const session = await getSession();
  const userId = session.id;

  if (userId) {
    return NextResponse.json({
      isLoggedIn: true,
      userId: userId,
    });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
