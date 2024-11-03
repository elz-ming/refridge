import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  fridgeId?: ObjectId; // Reference to the user's fridge
}
