"use client";

import React, { useState } from "react";
import Popup from "./components/Popup";

type FoodStorage = "shelf" | "fridge" | "freezer";

interface FoodItem {
  name: string;
  description: string;
  expiryDate: string;
  type: "solid" | "liquid";
}
export default function Home() {
  const [activeStorage, setActiveStorage] = useState<FoodStorage | null>(null);

  const [foodLists, setFoodLists] = useState({
    shelf: [] as FoodItem[],
    fridge: [] as FoodItem[],
    freezer: [] as FoodItem[],
  });

  // Handler to open the popup for each section
  const handleOpenPopup = (storage: FoodStorage) => setActiveStorage(storage);
  const handleClosePopup = () => setActiveStorage(null);

  const handleAddFood = (item: FoodItem) => {
    if (activeStorage) {
      setFoodLists((prevLists) => ({
        ...prevLists,
        [activeStorage]: [...prevLists[activeStorage], item],
      }));
    }
  };

  const handleDeleteFood = (index: number) => {
    if (activeStorage) {
      setFoodLists((prevLists) => ({
        ...prevLists,
        [activeStorage]: prevLists[activeStorage].filter((_, i) => i !== index),
      }));
    }
  };

  const handleEditFood = (index: number, updatedItem: FoodItem) => {
    if (activeStorage) {
      setFoodLists((prevLists) => ({
        ...prevLists,
        [activeStorage]: prevLists[activeStorage].map((item, i) =>
          i === index ? updatedItem : item
        ),
      }));
    }
  };

  return (
    <main className="h-[80%]">
      <div
        id="kitchen"
        className="h-full w-full lg:w-1/2 bg-gray-100 flex flex-col justify-end items-center gap-4 px-8"
      >
        <div
          id="shelf"
          className="h-[20%] w-full lg:w-1/2 bg-[#7B672F]"
          onClick={() => handleOpenPopup("shelf")}
        >
          Shelf
        </div>
        <div
          id="fridge"
          className="h-[40%] w-full lg:w-1/2 bg-[#B8B8B8]"
          onClick={() => handleOpenPopup("fridge")}
        >
          Fridge
        </div>
        <div
          id="freezer"
          className="h-[20%] w-full lg:w-1/2 bg-[#B8B8B8]"
          onClick={() => handleOpenPopup("freezer")}
        >
          Freezer
        </div>
      </div>
      {activeStorage && (
        <Popup
          storage={activeStorage}
          items={foodLists[activeStorage]}
          onClose={handleClosePopup}
          onAddFood={handleAddFood}
          onDeleteFood={handleDeleteFood}
          onEditFood={handleEditFood}
        />
      )}
    </main>
  );
}
