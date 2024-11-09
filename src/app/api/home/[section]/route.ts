import { NextRequest, NextResponse } from "next/server";
import { getMongoClient } from "../../../lib/mongodb";
import { getSession } from "../../../lib/session";
import { ObjectId } from "mongodb";

export async function POST(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = await params;
  const newItem = await req.json();

  const session = await getSession();
  const userId = new ObjectId(session.id);

  const client = await getMongoClient();
  const db = client.db("recipe_db");

  await db
    .collection("fridge")
    .updateOne({ ownedBy: userId }, { $push: { [section]: newItem } });

  return NextResponse.json({ message: "Item added successfully" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = await params;
  const { index, updatedItem } = await req.json();

  const session = await getSession();
  const userId = new ObjectId(session.id);

  const client = await getMongoClient();
  const db = client.db("recipe_db");

  const update = { [`${section}.${index}`]: updatedItem };
  await db
    .collection("fridge")
    .updateOne({ ownedBy: userId }, { $set: update });

  return NextResponse.json({ message: "Item updated successfully" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const { section } = await params;
  const { index } = await req.json();

  const session = await getSession();
  const userId = new ObjectId(session.id);

  const client = await getMongoClient();
  const db = client.db("recipe_db");

  const items = await db.collection("fridge").findOne({ ownedBy: userId });
  if (items && items[section]) {
    items[section].splice(index, 1);
    await db
      .collection("fridge")
      .updateOne({ ownedBy: userId }, { $set: { [section]: items[section] } });
  }

  return NextResponse.json({ message: "Item deleted successfully" });
}
