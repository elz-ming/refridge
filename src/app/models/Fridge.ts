import { ObjectId } from "mongodb";
import { Food } from "./Food";

export interface Fridge {
  _id?: ObjectId;
  ownedBy: ObjectId; // Reference to the user who owns this fridge
  shelf: Food[]; // List of food items in the shelf section
  fridge: Food[]; // List of food items in the fridge section
  freezer: Food[]; // List of food items in the freezer section
}
