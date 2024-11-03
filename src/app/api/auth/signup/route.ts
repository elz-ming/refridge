import { getMongoClient } from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { User } from "../../../models/User";
import { Fridge } from "../../../models/Fridge";
import { ObjectId } from "mongodb";

const saltRounds = 10;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user object
    const newUser: Omit<User, "_id"> = {
      name,
      email,
      password: hashedPassword,
    };

    // Connect to the MongoDB client
    const client = await getMongoClient();
    const db = client.db("recipe_db"); // Replace with your database name

    // Check for existing user with the same email
    const existingUser = await db.collection<User>("user").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert the new user into the "user" collection
    const result = await db.collection("user").insertOne(newUser);
    const userId = result.insertedId;

    const newFridge: Omit<Fridge, "_id"> = {
      ownedBy: userId,
      shelf: [],
      fridge: [],
      freezer: [],
    };

    // Insert the fridge into the "fridges" collection
    await db.collection("fridge").insertOne(newFridge);

    // Send a success response
    return new Response(
      JSON.stringify({
        message: "User and fridgecreated successfully",
        userId: result.insertedId,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
