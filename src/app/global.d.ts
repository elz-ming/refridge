import { MongoClient } from "mongodb";

declare global {
  // Extend the NodeJS global type with a custom property
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

export {};
