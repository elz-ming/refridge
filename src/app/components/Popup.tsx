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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg max-w-md w-full h-[60vh] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center text-xl font-bold">
            Items in {storage}
          </h2>
          <button onClick={onClose} className="p-1">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.8626 15.683L20.9358 23.7562C21.3641 24.1846 21.9452 24.4252 22.551 24.4252C23.1568 24.4252 23.7378 24.1846 24.1662 23.7562C24.5946 23.3278 24.8353 22.7468 24.8353 22.141C24.8353 21.5351 24.5946 20.9541 24.1662 20.5257L16.09 12.4526L24.1647 4.37944C24.3767 4.16732 24.5449 3.91552 24.6596 3.63842C24.7743 3.36131 24.8333 3.06433 24.8332 2.76442C24.8332 2.46451 24.774 2.16756 24.6592 1.89051C24.5443 1.61346 24.3761 1.36174 24.1639 1.14972C23.9518 0.937706 23.7 0.769546 23.4229 0.654842C23.1458 0.540138 22.8488 0.481137 22.5489 0.481208C22.249 0.481278 21.9521 0.540419 21.675 0.655254C21.398 0.770088 21.1462 0.938368 20.9342 1.15048L12.8626 9.22362L4.78947 1.15048C4.57892 0.932284 4.32703 0.7582 4.04848 0.638392C3.76994 0.518583 3.47032 0.455448 3.16711 0.452671C2.8639 0.449895 2.56318 0.507531 2.28249 0.622218C2.00179 0.736905 1.74675 0.906346 1.53224 1.12065C1.31773 1.33496 1.14805 1.58984 1.0331 1.87043C0.918147 2.15101 0.860227 2.45168 0.862717 2.75489C0.865208 3.0581 0.92806 3.35778 1.04761 3.63644C1.16715 3.9151 1.341 4.16716 1.559 4.37791L9.63519 12.4526L1.56052 20.5272C1.34252 20.738 1.16867 20.9901 1.04913 21.2687C0.929583 21.5474 0.866731 21.847 0.86424 22.1503C0.861749 22.4535 0.919669 22.7541 1.03462 23.0347C1.14957 23.3153 1.31925 23.5702 1.53376 23.7845C1.74827 23.9988 2.00331 24.1682 2.28401 24.2829C2.5647 24.3976 2.86543 24.4553 3.16863 24.4525C3.47184 24.4497 3.77146 24.3866 4.05 24.2668C4.32855 24.147 4.58045 23.9729 4.791 23.7547L12.8626 15.683Z"
                fill="black"
              />
            </svg>
          </button>
        </div>

        {mode === "list" && (
          <>
            {/* Scrollable Food List */}
            <div className="h-full overflow-y-auto border rounded p-2">
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
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add New Food
            </button>
          </>
        )}

        {mode === "add" && (
          <>
            {/* Add Food Form */}
            <div id="inputs" className="flex flex-col gap-4 h-full">
              <label className="flex justify-between items-center gap-2">
                <span className="w-2/5 font-semibold">Name :</span>
                <input
                  type="text"
                  placeholder="required"
                  value={newFood.name}
                  onChange={(e) =>
                    setNewFood({ ...newFood, name: e.target.value })
                  }
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Description :</span>
                <input
                  type="text"
                  placeholder="( optional )"
                  value={newFood.description}
                  onChange={(e) =>
                    setNewFood({ ...newFood, description: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Expiry Date :</span>
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={newFood.expiryDate}
                  onChange={(e) =>
                    setNewFood({ ...newFood, expiryDate: e.target.value })
                  }
                  className="border p-2 w-full"
                />
                {!newFood.expiryDate && (
                  <span className="absolute inset-y-0 left-3 text-gray-400 pointer-events-none">
                    Expiry Date
                  </span>
                )}
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Type :</span>
                <select
                  value={newFood.type}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      type: e.target.value as "solid" | "liquid",
                    })
                  }
                  className="border p-2 w-full"
                >
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                </select>
              </label>
            </div>
            <div id="buttons" className="flex gap-4">
              <button
                onClick={handleAddFood}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setMode("list")}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {mode === "view" && selectedFoodIndex !== null && (
          <>
            {/* Food Details View */}
            <div id="details" className="flex flex-col gap-4 h-full">
              <p>
                <span className="font-semibold">Name: </span>
                {newFood.name}
              </p>
              <p>
                <span className="font-semibold">Description: </span>
                {newFood.description}
              </p>
              <p>
                <span className="font-semibold">Expiry Date: </span>
                {newFood.expiryDate}
              </p>
              <p>
                <span className="font-semibold">Type: </span>
                {newFood.type}
              </p>
            </div>
            <div id="buttons" className="flex gap-4">
              <button
                onClick={() => setMode("edit")}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteFood}
                className="w-full bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setMode("list")}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {mode === "edit" && (
          <>
            {/* Edit Food Form */}
            <div id="inputs" className="flex flex-col gap-4 h-full">
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Name :</span>
                <input
                  type="text"
                  placeholder="required"
                  value={newFood.name}
                  onChange={(e) =>
                    setNewFood({ ...newFood, name: e.target.value })
                  }
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Description :</span>
                <input
                  type="text"
                  placeholder="( optional )"
                  value={newFood.description}
                  onChange={(e) =>
                    setNewFood({ ...newFood, description: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Expiry Date :</span>
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={newFood.expiryDate}
                  onChange={(e) =>
                    setNewFood({ ...newFood, expiryDate: e.target.value })
                  }
                  className="border p-2 w-full"
                />
              </label>
              <label className="flex items-center gap-2">
                <span className="w-2/5 font-semibold">Type :</span>
                <select
                  value={newFood.type}
                  onChange={(e) =>
                    setNewFood({
                      ...newFood,
                      type: e.target.value as "solid" | "liquid",
                    })
                  }
                  className="border p-2 w-full"
                >
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                </select>
              </label>
            </div>
            <div id="buttons" className="flex gap-4">
              <button
                onClick={handleEditSave}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setMode("list")}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
