"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("../api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to login page after successful signup
        router.push("/signin");
      } else {
        const errorData = await response.json();
        console.warn(
          "Signup error:",
          errorData.error || "An error occurred during signup."
        );
      }
    } catch (error) {
      console.error("Unexpected error during signup:", error);
    }
  };

  return (
    <>
      <header className="h-[10%] w-full bg-gray-800"></header>
      <main className="h-[80%] flex items-center justify-center bg-[#ded472]">
        <div className="signup-container bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Sign Up
          </h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col text-gray-700">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col text-gray-700">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col text-gray-700">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
      <footer className="h-[10%] w-full bg-gray-800"></footer>
    </>
  );
}
