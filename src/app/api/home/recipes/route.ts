import { NextRequest, NextResponse } from "next/server";

interface Substitute {
  ingredient: string;
  measure: string;
}

// Define an interface for each ingredient
interface Ingredient {
  name: string;
  measure: string;
  is_main: boolean;
  available: boolean;
  substitutes?: Substitute[];
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const input = await req.json();
  const substitution = input.suggest_substitution;

  const payload = {
    main_ingredients: [...input.main_ingredients],
    pantry_ingredients: [...input.pantry_ingredients],
  };

  const endpoint = substitution
    ? "https://2uwxobn4bp25wbwbsk57zigbsq0lbnxe.lambda-url.us-east-1.on.aws/substitute"
    : "https://2uwxobn4bp25wbwbsk57zigbsq0lbnxe.lambda-url.us-east-1.on.aws/recommend";

  try {
    // Send POST request to the selected endpoint
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from external API");
    }

    // Parse the response JSON
    const data = await response.json();

    // Format the response data as needed
    const output = {
      title: data.data.recipe.recipe_name,
      ingredients: data.data.recipe.ingredients.map(
        (ingredient: Ingredient) => {
          if (substitution) {
            if (ingredient.available) {
              return `${ingredient.name}, ${ingredient.measure}`;
            } else {
              const substitute = ingredient.substitutes?.[0];
              return substitute
                ? `(s) ${ingredient.name}, ${ingredient.measure} -> ${substitute.ingredient}, ${substitute.measure}`
                : `(m) ${ingredient.name}, ${ingredient.measure}`; // No substitute available
            }
          } else {
            return `${ingredient.name}, ${ingredient.measure}`;
          }
        }
      ),
      steps: data.data.recipe.steps,
      image_url: data.data.recipe.image_url,
    };

    // Return the formatted output
    return NextResponse.json({ data: output });
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return NextResponse.json(
      { error: "Failed to retrieve recipe data" },
      { status: 500 }
    );
  }
}
