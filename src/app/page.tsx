"use client";

import React, { useEffect, useState } from "react";
import Popup from "./components/Popup";
import { Food } from "./models/Food";
import { useRouter } from "next/navigation";

type FoodStorage = "shelf" | "fridge" | "freezer";

interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  image_url: string;
}

export default function Home() {
  const [activeStorage, setActiveStorage] = useState<FoodStorage | null>(null);
  const [fridgeData, setFridgeData] = useState<Record<FoodStorage, Food[]>>({
    shelf: [],
    fridge: [],
    freezer: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uniqueIngredients, setUniqueIngredients] = useState<string[]>([]);

  const [foods, setFoods] = useState<Food[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mainIngredient, setMainIngredient] = useState<string | null>(null);
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const [suggestSubstitution, setSuggestSubstitution] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    ingredients: [],
    steps: [],
    image_url: "",
  });

  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by calling an API to check session
    const checkSession = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
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

  // GET - Fetch fridge data on mount and store it in memory
  useEffect(() => {
    const fetchFridgeData = async () => {
      const response = await fetch("/api/home/fridge-data"); // Adjust endpoint as needed
      if (response.ok) {
        const data = await response.json();
        setFridgeData({
          shelf: data.shelf || [],
          fridge: data.fridge || [],
          freezer: data.freezer || [],
        });
        setUniqueIngredients(data.uniqueIngredients || []);
      }
    };
    fetchFridgeData();
  }, []);

  // POST
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
        setFridgeData((prevData) => ({
          ...prevData,
          [activeStorage]: [...prevData[activeStorage], item],
        }));
        setFoods((prevItems) => [...prevItems, item]);
      }
    }
  };

  // DELETE
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
        setFridgeData((prevData) => ({
          ...prevData,
          [activeStorage]: prevData[activeStorage].filter(
            (_, i) => i !== index
          ),
        }));
        setFoods((prevItems) => prevItems.filter((_, i) => i !== index));
      }
    }
  };

  // PUT
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
        setFridgeData((prevData) => ({
          ...prevData,
          [activeStorage]: prevData[activeStorage].map((item, i) =>
            i === index ? updatedItem : item
          ),
        }));
        setFoods((prevItems) =>
          prevItems.map((item, i) => (i === index ? updatedItem : item))
        );
      }
    }
  };

  // Dropdown filtering logic for main ingredient selection
  useEffect(() => {
    const fridgeIngredients = [
      ...fridgeData.shelf.map((item) => item.name.toLowerCase()),
      ...fridgeData.fridge.map((item) => item.name.toLowerCase()),
      ...fridgeData.freezer.map((item) => item.name.toLowerCase()),
    ];

    const availableIngredients = uniqueIngredients.filter((ingredient) =>
      ingredient.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    const prioritizedIngredients = availableIngredients.sort((a, b) => {
      const aInFridge = fridgeIngredients.includes(a);
      const bInFridge = fridgeIngredients.includes(b);
      return aInFridge === bInFridge ? 0 : aInFridge ? -1 : 1;
    });

    setFilteredIngredients(prioritizedIngredients);

    // Open the dropdown only when there is input
    setIsDropdownOpen(inputValue.length > 0);
  }, [inputValue, uniqueIngredients, fridgeData]);

  // Handle selection of ingredient from dropdown
  const handleIngredientSelect = (ingredient: string) => {
    setMainIngredient(ingredient);
    setInputValue(ingredient);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // Generate pantry ingredients when main ingredient is selected
    if (mainIngredient) {
      const allFridgeItems = [
        ...fridgeData.shelf.map((item) => item.name.toLowerCase()),
        ...fridgeData.fridge.map((item) => item.name.toLowerCase()),
        ...fridgeData.freezer.map((item) => item.name.toLowerCase()),
      ];

      // Exclude the main ingredient to form pantry ingredients
      const filteredPantryIngredients = allFridgeItems.filter(
        (item) => item !== mainIngredient.toLowerCase()
      );

      setPantryIngredients(filteredPantryIngredients);
    }
  }, [mainIngredient, fridgeData]);

  const handleGenerateRecipe = async () => {
    const payload = {
      main_ingredients: mainIngredient ? [mainIngredient] : [],
      pantry_ingredients: pantryIngredients,
      suggest_substitution: suggestSubstitution, // Include boolean value from checkbox
    };

    try {
      const response = await fetch("/api/home/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const recipeData = data.data;
        const formattedRecipe: Recipe = {
          title: recipeData.title || "Untitled Recipe",
          image_url: recipeData.image_url || "",
          ingredients: recipeData.ingredients || [],
          steps: recipeData.steps || [],
        };
        setRecipe(formattedRecipe);
      } else {
        console.warn("Failed to generate recipe.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  // Handler to open the popup for each section
  const handleOpenPopup = (storage: FoodStorage) => {
    setActiveStorage(storage);
    setFoods(fridgeData[storage]); // Load the selected section's food data from memory
  };
  const handleClosePopup = () => setActiveStorage(null);

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

      {/* Recipe Generator */}
      <div
        id="recipe-generator"
        className="hidden lg:flex h-full w-2/3 bg-gray-200 flex-col justify-start items-center gap-4 py-8 px-8"
      >
        <h2 className="text-xl font-bold">Recipe Generator</h2>
        {/* Recipe Configuration */}
        <div
          id="recipe-configuration"
          className="flex w-full justify-between items-start"
        >
          {/* Drop Down for Main Ingredient */}
          <div className="flex gap-2">
            <label className="flex items-center text-gray-700">
              Main Ingredient:
            </label>
            <div id="dropdown-container" className="flex flex-col">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Start typing..."
                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 w-[300px]"
              />
              {isDropdownOpen && (
                <ul className="absolute z-5 bg-white border border-gray-300 w-[300px] max-h-40 mt-10 overflow-y-scroll">
                  {filteredIngredients.map((ingredient) => {
                    const isAvailable = fridgeData.shelf
                      .concat(fridgeData.fridge, fridgeData.freezer)
                      .some((food) => food.name.toLowerCase() === ingredient);
                    return (
                      <li
                        key={ingredient}
                        onClick={() => handleIngredientSelect(ingredient)}
                        className={`h-10 p-2 cursor-pointer hover:bg-gray-200 ${
                          isAvailable ? "text-black" : "text-gray-400"
                        }`}
                      >
                        {ingredient}
                        <span
                          className={`ml-2 ${
                            isAvailable ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          {/* Suggest Substitution Radio Button */}
          <div className="flex items-start">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={suggestSubstitution}
                onChange={() => setSuggestSubstitution(!suggestSubstitution)} // Toggle true/false
                className="mr-2"
              />
              Suggest substitution
            </label>
          </div>
          {/* Generate Recipe */}
          <button
            onClick={handleGenerateRecipe}
            className="bg-blue-500 text-white px-4 py-2 rounded h-auto"
          >
            Generate Recipe
          </button>
        </div>

        {/* Recipe Display */}
        {recipe.image_url != "" && (
          <div id="recipe-display" className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="mb-4 max-w-full h-auto"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Steps:</h3>
              <ol className="list-decimal pl-5">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="mb-2">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
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
