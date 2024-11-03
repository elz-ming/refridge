import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export async function DELETE(request: Request) {
  const headers = new Headers();
  headers.set("Cache-Control", "no-cache");

  const session = await getSession();
  if (session.id) {
    session.destroy(); // Destroys the session to log the user out
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200, headers }
    );
  } else {
    return NextResponse.json(
      { error: "No active session to log out" },
      { status: 400 }
    );
  }
}
