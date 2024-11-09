import { NextResponse } from "next/server";
import { getMongoClient } from "../../../lib/mongodb";
import { getSession } from "../../../lib/session";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    // Get the session
    const session = await getSession();
    const userId = new ObjectId(session.id);

    const client = await getMongoClient();
    const db = client.db("recipe_db");

    // Find the fridge data for the logged-in user
    const fridgeData = await db
      .collection("fridge")
      .findOne({ ownedBy: userId });

    if (!fridgeData) {
      return NextResponse.json(
        { error: "Fridge data not found for the user" },
        { status: 404 }
      );
    }

    const recipeCollection = db.collection("recipe_vector");
    const allDocuments = await recipeCollection
      .find({}, { projection: { main_ingredients: 1 } })
      .toArray();

    const mainList: string[] = [];
    allDocuments.forEach((doc) => {
      const ingredients = doc.main_ingredients.split(",");
      mainList.push(...ingredients.map((ingredient) => ingredient.trim()));
    });

    // Remove duplicates and get the unique ingredients array
    const uniqueIngredients = Array.from(new Set(mainList));

    // Return the user's fridge data
    return NextResponse.json({
      shelf: fridgeData.shelf || [],
      fridge: fridgeData.fridge || [],
      freezer: fridgeData.freezer || [],
      uniqueIngredients: uniqueIngredients || [],
    });
  } catch (error) {
    console.error("Error retrieving fridge data:", error);
    return NextResponse.json(
      { error: "Error retrieving fridge data" },
      { status: 500 }
    );
  }
}
