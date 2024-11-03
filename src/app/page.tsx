"use client";

import React, { useEffect, useState } from "react";
import Popup from "./components/Popup";
import { Food } from "./models/Food";
import { useRouter } from "next/navigation";
import { log } from "console";

type FoodStorage = "shelf" | "fridge" | "freezer";

export default function Home() {
  const [activeStorage, setActiveStorage] = useState<FoodStorage | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by calling an API to check session
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Log out by clearing session and redirecting
      fetch("/api/auth/signout", { method: "DELETE" }).then(() => {
        setIsLoggedIn(false);
        router.push("/signin"); // Redirect to login page
      });
    } else {
      // Redirect to login page
      router.push("/signin");
    }
  };

  useEffect(() => {
    const fetchFoods = async () => {
      if (activeStorage) {
        const response = await fetch(`/api/home/${activeStorage}`);
        if (response.ok) {
          const foods: Food[] = await response.json();
          setFoods(foods);
        }
      }
    };
    fetchFoods();
  }, [activeStorage]);

  // Temporary
  const recipes = [
    "1. Combine 200g pasta\n2. Add 2 cups of tomato sauce\n3. Top with cheese\n4. Serve hot",
    "1. Mix 100g of rice\n2. Stir-fry with vegetables\n3. Add soy sauce\n4. Garnish with sesame seeds",
    "1. Grill 200g chicken breast\n2. Add spices and herbs\n3. Serve with steamed vegetables\n4. Drizzle with lemon juice",
  ];

  const [recipeIndex, setRecipeIndex] = useState(0);
  const [recipe, setRecipe] = useState<string | null>(null);

  // Handler to open the popup for each section
  const handleOpenPopup = (storage: FoodStorage) => setActiveStorage(storage);
  const handleClosePopup = () => setActiveStorage(null);

  const handleAddFood = async (item: Food) => {
    if (!isLoggedIn) {
      router.push("/signin");
    }

    if (activeStorage) {
      const response = await fetch(`/api/home/${activeStorage}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        setFoods((prevItems) => [...prevItems, item]);
      }
    }
  };

  const handleDeleteFood = async (index: number) => {
    if (!isLoggedIn) {
      router.push("/signin");
    }

    if (activeStorage) {
      const response = await fetch(`./api/home/${activeStorage}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }), // Pass the index or unique ID
      });
      if (response.ok) {
        setFoods((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    }
  };

  const handleEditFood = async (index: number, updatedItem: Food) => {
    if (!isLoggedIn) {
      router.push("/signin");
    }

    if (activeStorage) {
      const response = await fetch(`./api/home/${activeStorage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, updatedItem }),
      });
      if (response.ok) {
        setFoods((prevItems) =>
          prevItems.map((item, i) => (i === index ? updatedItem : item))
        );
      }
    }
  };

  // Recipe generation handler
  const handleGenerateRecipe = () => {
    setRecipe(recipes[recipeIndex]); // Set the current recipe based on index
    setRecipeIndex((recipeIndex + 1) % recipes.length); // Cycle to the next recipe index
  };

  const handleSaveRecipe = () => {
    if (recipe) {
      alert("Recipe saved!");
      // Add save logic here if needed.
    }
  };

  return (
    <main className="h-[100%] flex">
      {/* Login/Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLoginLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>

      {/* Desktop left section - Kitchen */}
      <div
        id="kitchen"
        className="flex h-full w-full lg:w-1/3 bg-[#ded472] flex-col"
      >
        <div id="ceiling" className="h-[10%] w-full bg-gray-800"></div>

        <div
          id="container"
          className="h-[80%] w-full flex flex-col justify-end items-center px-8"
        >
          <div
            id="shelf"
            className="h-[25%] w-2/3 lg:w-1/2 cursor-pointer relative overflow-hidden mb-4"
            onClick={() => handleOpenPopup("shelf")}
          >
            <img
              src="/images/shelf.jpg"
              alt="Shelf"
              className="w-full h-full object-fill"
            />
          </div>
          <div
            id="fridge"
            className="h-[40%] w-2/3 lg:w-1/2 cursor-pointer relative overflow-hidden"
            onClick={() => handleOpenPopup("fridge")}
          >
            <img
              src="/images/fridge.png"
              alt="Shelf"
              className="w-full h-full object-fill"
            />
          </div>
          <div
            id="freezer"
            className="h-[25%] w-2/3 lg:w-1/2 cursor-pointer relative overflow-hidden"
            onClick={() => handleOpenPopup("freezer")}
          >
            <img
              src="/images/fridge.png"
              alt="Shelf"
              className="w-full h-full object-fill"
            />
          </div>
        </div>

        <div id="floor" className="h-[10%] w-full bg-gray-800"></div>
      </div>

      <div
        id="recipe-generator"
        className="hidden lg:flex h-full w-2/3 bg-gray-200 flex-col justify-center items-center gap-4 px-8"
      >
        <h2 className="text-xl font-bold mb-4">Recipe Generator</h2>
        <div className="border p-4 h-40 mb-4 overflow-y-auto rounded">
          {recipe ? (
            <pre>{recipe}</pre>
          ) : (
            <p className="text-gray-500">No recipe generated yet.</p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleGenerateRecipe}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate Recipe
          </button>
          {recipe && (
            <button
              onClick={handleSaveRecipe}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Recipe
            </button>
          )}
        </div>
      </div>
      {activeStorage && (
        <Popup
          storage={activeStorage}
          items={foods}
          onClose={handleClosePopup}
          onAddFood={handleAddFood}
          onDeleteFood={handleDeleteFood}
          onEditFood={handleEditFood}
        />
      )}
    </main>
  );
}
