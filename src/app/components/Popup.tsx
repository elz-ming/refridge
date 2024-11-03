import React, { useState } from "react";
import { Food } from "../models/Food";

interface PopupProps {
  storage: "shelf" | "fridge" | "freezer";
  items: Food[];
  onClose: () => void;
  onAddFood: (item: Food) => void;
  onDeleteFood: (index: number) => void;
  onEditFood: (index: number, item: Food) => void;
}

const Popup: React.FC<PopupProps> = ({
  storage,
  items,
  onClose,
  onAddFood,
  onDeleteFood,
  onEditFood,
}) => {
  const [mode, setMode] = useState<"list" | "add" | "view" | "edit">("list");

  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(
    null
  );

  const [newFood, setNewFood] = useState<Food>({
    name: "",
    description: "",
    expiryDate: "",
    type: "solid",
  });

  const handleAddClick = () => {
    setNewFood({ name: "", description: "", expiryDate: "", type: "solid" });
    setMode("add");
  };

  const handleAddFood = () => {
    onAddFood(newFood);
    setMode("list"); // Go back to list view after adding
  };

  const handleFoodClick = (index: number) => {
    setSelectedFoodIndex(index);
    setNewFood(items[index]);
    setMode("view");
  };

  const handleEditSave = () => {
    if (selectedFoodIndex !== null) {
      onEditFood(selectedFoodIndex, newFood);
      setMode("list"); // Go back to list view after saving
    }
  };

  const handleDeleteFood = () => {
    if (selectedFoodIndex !== null) {
      onDeleteFood(selectedFoodIndex);
      setMode("list"); // Go back to list view after deleting
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full h-[60vh] overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Items in {storage}</h2>

        {mode === "list" && (
          <>
            {/* Scrollable Food List */}
            <div className="h-[40vh] overflow-y-auto border rounded mb-4 p-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="border-b py-2 cursor-pointer"
                  onClick={() => handleFoodClick(index)}
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Expiry: {item.expiryDate}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddClick}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              Add New Food
            </button>
          </>
        )}

        {mode === "add" && (
          <>
            {/* Add Food Form */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newFood.name}
                onChange={(e) =>
                  setNewFood({ ...newFood, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newFood.description}
                onChange={(e) =>
                  setNewFood({ ...newFood, description: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newFood.expiryDate}
                onChange={(e) =>
                  setNewFood({ ...newFood, expiryDate: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <select
                value={newFood.type}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    type: e.target.value as "solid" | "liquid",
                  })
                }
                className="border p-2 w-full mb-4"
              >
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
              </select>
              <button
                onClick={handleAddFood}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setMode("list")}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {mode === "view" && selectedFoodIndex !== null && (
          <>
            {/* Food Details View */}
            <div className="mb-4">
              <p className="font-semibold">Name: {newFood.name}</p>
              <p>Description: {newFood.description}</p>
              <p>Expiry Date: {newFood.expiryDate}</p>
              <p>Type: {newFood.type}</p>
              <button
                onClick={() => setMode("edit")}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteFood}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <>
            {/* Edit Food Form */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newFood.name}
                onChange={(e) =>
                  setNewFood({ ...newFood, name: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newFood.description}
                onChange={(e) =>
                  setNewFood({ ...newFood, description: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newFood.expiryDate}
                onChange={(e) =>
                  setNewFood({ ...newFood, expiryDate: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />
              <select
                value={newFood.type}
                onChange={(e) =>
                  setNewFood({
                    ...newFood,
                    type: e.target.value as "solid" | "liquid",
                  })
                }
                className="border p-2 w-full mb-4"
              >
                <option value="solid">Solid</option>
                <option value="liquid">Liquid</option>
              </select>
              <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setMode("list")}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
