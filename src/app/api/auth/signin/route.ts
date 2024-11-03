import { getSession } from "../../../lib/session";
import { getMongoClient } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "../../../models/User";

async function setCookie(id: string) {
  const loginSession = await getSession();
  loginSession.id = id;
  await loginSession.save();
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password } = data;

    // Connect to MongoDB
    const client = await getMongoClient();
    const db = client.db("recipe_db");

    // Find the user by email
    const user = await db.collection<User>("user").findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Compare provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set session data for the user
    await setCookie(user._id.toString());

    // If successful, return a success response
    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: "Error logging in" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
