import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

const getLoginSessionOptions: SessionOptions = {
  password: String(process.env.NEXT_IRON_COOKIE_PASSWORD),
  cookieName: "login",
  ttl: 30 * 24 * 60 * 60, // one month validity for user convenience
  cookieOptions: {
    httpOnly: true,
    secure: true,
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, getLoginSessionOptions);
}
