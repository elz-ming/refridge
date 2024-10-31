import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

export function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}
