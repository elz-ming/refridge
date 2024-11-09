import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const input = await req.json();

  const subsitution = input.suggest_substitution;

  let response;
  let output;

  if (subsitution) {
    response = {
      status: "success",
      data: {
        recipe: {
          recipe_name: "Chicken Basquaise",
          category: "Chicken",
          cuisine: "French",
          match_scores: {
            main_score: 100,
            pantry_score: 15.79,
            total_score: 74.74,
            main_matches: 1,
            pantry_matches: 3,
          },
          ingredients: [
            {
              name: "chicken",
              measure: "1.5kg",
              is_main: true,
              available: true,
            },
            {
              name: "butter",
              measure: "25g",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "olive oil",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "coconut oil",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "applesauce",
                  measure: "1/4 cup",
                },
              ],
            },
            {
              name: "olive oil",
              measure: "6 tblsp",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "Applesauce",
                  measure: "4 tablespoons",
                },
                {
                  ingredient: "Avocado",
                  measure: "1/2 avocado",
                },
              ],
            },
            {
              name: "red onions",
              measure: "2 sliced",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "shallots",
                  measure: "1/2 cup chopped",
                },
                {
                  ingredient: "green onions",
                  measure: "1/2 cup chopped",
                },
              ],
            },
            {
              name: "red pepper",
              measure: "3 Large",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "1 large yellow pepper",
                  measure: "1",
                },
                {
                  ingredient: "1 large orange pepper",
                  measure: "1",
                },
                {
                  ingredient: "1 large green pepper",
                  measure: "1",
                },
              ],
            },
            {
              name: "chorizo",
              measure: "130g",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "smoked paprika",
                  measure: "1 tablespoon",
                },
                {
                  ingredient: "spicy Italian sausage",
                  measure: "1/2 cup",
                },
              ],
            },
            {
              name: "sun-dried tomatoes",
              measure: "8",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "dried tomatoes",
                  measure: "8 pieces",
                },
                {
                  ingredient: "tomato paste",
                  measure: "2 tablespoons",
                },
              ],
            },
            {
              name: "garlic",
              measure: "6 cloves sliced",
              is_main: false,
              available: true,
            },
            {
              name: "basmati rice",
              measure: "300g",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "white rice",
                  measure: "300g",
                },
                {
                  ingredient: "quinoa",
                  measure: "300g cooked",
                },
              ],
            },
            {
              name: "tomato puree",
              measure: "drizzle",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "tomato paste",
                  measure: "1 tablespoon",
                },
                {
                  ingredient: "tomato sauce",
                  measure: "1/4 cup",
                },
              ],
            },
            {
              name: "paprika",
              measure: "tsp",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "smoked paprika",
                  measure: "1 tsp",
                },
                {
                  ingredient: "cayenne pepper",
                  measure: "1/4 tsp",
                },
              ],
            },
            {
              name: "bay leaves",
              measure: "4",
              is_main: false,
              available: false,
            },
            {
              name: "thyme",
              measure: "Handful",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "oregano",
                  measure: "1 teaspoon",
                },
                {
                  ingredient: "marjoram",
                  measure: "1 teaspoon",
                },
              ],
            },
            {
              name: "chicken stock",
              measure: "350ml",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "water",
                  measure: "350ml",
                },
                {
                  ingredient: "vegetable broth",
                  measure: "350ml",
                },
              ],
            },
            {
              name: "dry white wine",
              measure: "180g",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "chicken broth",
                  measure: "240ml",
                },
                {
                  ingredient: "white grape juice",
                  measure: "240ml",
                },
              ],
            },
            {
              name: "lemons",
              measure: "2",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "lime juice",
                  measure: "2 limes",
                },
                {
                  ingredient: "white wine vinegar",
                  measure: "2 tablespoons",
                },
              ],
            },
            {
              name: "black olives",
              measure: "100g",
              is_main: false,
              available: false,
              substitutes: [
                {
                  ingredient: "capers",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "pitted green olives",
                  measure: "100g",
                },
              ],
            },
            {
              name: "salt",
              measure: "to serve",
              is_main: false,
              available: true,
            },
            {
              name: "pepper",
              measure: "to serve",
              is_main: false,
              available: true,
            },
          ],
          steps: [
            "Preheat the oven to 180C/Gas mark 4. Have the chicken joints ready to cook. Heat the butter and 3 tbsp olive oil in a flameproof casserole or large frying pan. Brown the chicken pieces in batches on both sides, seasoning them with salt and pepper as you go. Don't crowd the pan - fry the chicken in small batches, removing the pieces to kitchen paper as they are done.",
            "Add a little more olive oil to the casserole and fry the onions over a medium heat for 10 minutes, stirring frequently, until softened but not browned. Add the rest of the oil, then the peppers and cook for another 5 minutes.",
            "Add the chorizo, sun-dried tomatoes and garlic and cook for 2-3 minutes. Add the rice, stirring to ensure it is well coated in the oil. Stir in the tomato paste, paprika, bay leaves and chopped thyme. Pour in the stock and wine. When the liquid starts to bubble, turn the heat down to a gentle simmer. Press the rice down into the liquid if it isn't already submerged and place the chicken on top. Add the lemon wedges and olives around the chicken.",
            "Cover and cook in the oven for 50 minutes. The rice should be cooked but still have some bite, and the chicken should have juices that run clear when pierced in the thickest part with a knife. If not, cook for another 5 minutes and check again.",
          ],
          image_url:
            "https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg",
          missing_ingredients: [
            {
              name: "butter",
              measure: "25g",
              substitutes: [
                {
                  ingredient: "olive oil",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "coconut oil",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "applesauce",
                  measure: "1/4 cup",
                },
              ],
            },
            {
              name: "olive oil",
              measure: "6 tblsp",
              substitutes: [
                {
                  ingredient: "Applesauce",
                  measure: "4 tablespoons",
                },
                {
                  ingredient: "Avocado",
                  measure: "1/2 avocado",
                },
              ],
            },
            {
              name: "red onions",
              measure: "2 sliced",
              substitutes: [
                {
                  ingredient: "shallots",
                  measure: "1/2 cup chopped",
                },
                {
                  ingredient: "green onions",
                  measure: "1/2 cup chopped",
                },
              ],
            },
            {
              name: "red pepper",
              measure: "3 Large",
              substitutes: [
                {
                  ingredient: "1 large yellow pepper",
                  measure: "1",
                },
                {
                  ingredient: "1 large orange pepper",
                  measure: "1",
                },
                {
                  ingredient: "1 large green pepper",
                  measure: "1",
                },
              ],
            },
            {
              name: "chorizo",
              measure: "130g",
              substitutes: [
                {
                  ingredient: "smoked paprika",
                  measure: "1 tablespoon",
                },
                {
                  ingredient: "spicy Italian sausage",
                  measure: "1/2 cup",
                },
              ],
            },
            {
              name: "sun-dried tomatoes",
              measure: "8",
              substitutes: [
                {
                  ingredient: "dried tomatoes",
                  measure: "8 pieces",
                },
                {
                  ingredient: "tomato paste",
                  measure: "2 tablespoons",
                },
              ],
            },
            {
              name: "basmati rice",
              measure: "300g",
              substitutes: [
                {
                  ingredient: "white rice",
                  measure: "300g",
                },
                {
                  ingredient: "quinoa",
                  measure: "300g cooked",
                },
              ],
            },
            {
              name: "tomato puree",
              measure: "drizzle",
              substitutes: [
                {
                  ingredient: "tomato paste",
                  measure: "1 tablespoon",
                },
                {
                  ingredient: "tomato sauce",
                  measure: "1/4 cup",
                },
              ],
            },
            {
              name: "paprika",
              measure: "tsp",
              substitutes: [
                {
                  ingredient: "smoked paprika",
                  measure: "1 tsp",
                },
                {
                  ingredient: "cayenne pepper",
                  measure: "1/4 tsp",
                },
              ],
            },
            {
              name: "bay leaves",
              measure: "4",
              substitutes: [],
            },
            {
              name: "thyme",
              measure: "Handful",
              substitutes: [
                {
                  ingredient: "oregano",
                  measure: "1 teaspoon",
                },
                {
                  ingredient: "marjoram",
                  measure: "1 teaspoon",
                },
              ],
            },
            {
              name: "chicken stock",
              measure: "350ml",
              substitutes: [
                {
                  ingredient: "water",
                  measure: "350ml",
                },
                {
                  ingredient: "vegetable broth",
                  measure: "350ml",
                },
              ],
            },
            {
              name: "dry white wine",
              measure: "180g",
              substitutes: [
                {
                  ingredient: "chicken broth",
                  measure: "240ml",
                },
                {
                  ingredient: "white grape juice",
                  measure: "240ml",
                },
              ],
            },
            {
              name: "lemons",
              measure: "2",
              substitutes: [
                {
                  ingredient: "lime juice",
                  measure: "2 limes",
                },
                {
                  ingredient: "white wine vinegar",
                  measure: "2 tablespoons",
                },
              ],
            },
            {
              name: "black olives",
              measure: "100g",
              substitutes: [
                {
                  ingredient: "capers",
                  measure: "2 tablespoons",
                },
                {
                  ingredient: "pitted green olives",
                  measure: "100g",
                },
              ],
            },
          ],
          total_score: 74.74,
        },
        metadata: {
          main_ingredients: ["chicken"],
          pantry_ingredients: [
            "pepper",
            "onion",
            "salt",
            "soy sauce",
            "garlic",
            "vegetable oil",
            "ginger",
          ],
        },
      },
      error: null,
      details: null,
    };

    output = {
      title: response.data.recipe.recipe_name,
      ingredients: response.data.recipe.ingredients.map((ingredient) => {
        if (ingredient.available) {
          return `${ingredient.name}, ${ingredient.measure}`;
        } else {
          const substitute = ingredient.substitutes?.[0];
          return substitute
            ? `(${ingredient.name}, ${ingredient.measure}) -> ${substitute.ingredient}, ${substitute.measure}`
            : `(${ingredient.name}, ${ingredient.measure})`; // No substitute available
        }
      }),
      steps: response.data.recipe.steps,
      image_url: response.data.recipe.image_url,
    };
  } else {
    response = {
      status: "success",
      data: {
        recipe: {
          recipe_name: "Kentucky Fried Chicken",
          category: "Chicken",
          cuisine: "American",
          match_scores: {
            main_score: 100,
            pantry_score: 5.88,
            total_score: 71.76,
            main_matches: 1,
            pantry_matches: 1,
          },
          ingredients: [
            {
              name: "chicken",
              measure: "1 whole",
              is_main: true,
              is_available: true,
            },
            {
              name: "oil",
              measure: "2 quarts neutral frying",
              is_main: false,
              is_available: false,
            },
            {
              name: "egg white",
              measure: "1",
              is_main: false,
              is_available: false,
            },
            {
              name: "flour",
              measure: "1 1/2 cups",
              is_main: false,
              is_available: false,
            },
            {
              name: "brown sugar",
              measure: "1 tablespoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "salt",
              measure: "1 tablespoon",
              is_main: false,
              is_available: true,
            },
            {
              name: "paprika",
              measure: "1 tablespoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "onion salt",
              measure: "2 teaspoons",
              is_main: false,
              is_available: false,
            },
            {
              name: "chili powder",
              measure: "1 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "black pepper",
              measure: "1 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "celery salt",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "sage",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "garlic powder",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "allspice",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "oregano",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "basil",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
            {
              name: "marjoram",
              measure: "1/2 teaspoon",
              is_main: false,
              is_available: false,
            },
          ],
          steps: [
            "Preheat fryer to 350F. Thoroughly mix together all the spice mix ingredients.",
            "Combine spice mix with flour, brown sugar and salt.",
            "Dip chicken pieces in egg white to lightly coat them, then transfer to flour mixture. Turn a few times and make sure the flour mix is really stuck to the chicken. Repeat with all the chicken pieces.",
            "Let chicken pieces rest for 5 minutes so crust has a chance to dry a bit.",
            "Fry chicken in batches. Breasts and wings should take 12-14 minutes, and legs and thighs will need a few more minutes. Chicken pieces are done when a meat thermometer inserted into the thickest part reads 165F.",
            "Let chicken drain on a few paper towels when it comes out of the fryer. Serve hot.",
          ],
          image_url:
            "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
          total_score: 71.76,
        },
        metadata: {
          main_ingredients: ["chicken"],
          pantry_ingredients: [
            "salt",
            "soy sauce",
            "pepper",
            "vegetable oil",
            "garlic",
            "ginger",
            "onion",
          ],
        },
      },
      error: null,
      details: null,
    };

    output = {
      title: response.data.recipe.recipe_name,
      ingredients: response.data.recipe.ingredients.map(
        (ingredient) => `${ingredient.name}, ${ingredient.measure}`
      ),
      steps: response.data.recipe.steps,
      image_url: response.data.recipe.image_url,
    };
  }

  return NextResponse.json({ data: output });
}
