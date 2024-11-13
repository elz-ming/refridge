# Intelli Foods

Intelli Foods is an innovative smart kitchen helper designed to make managing your pantry more efficient and reduce food waste. This tool enables users to keep track of food items stored in the fridge, freezer, and shelf, along with their expiry dates.

[Live Project](https://intelli-foods.vercel.app/)

Use following credentials to login, or create your own account!
email: intelli@gmail.com
password: foods

## Features

### Pantry Management

- **Track Food Items**: Easily log food items into the fridge, freezer, or shelf.
- **Expiry Date Monitoring**: Keep track of expiry dates to minimize food spoilage and wastage.

### AI-Powered Recipe Recommendations

- **Recipe Suggestions**: A fine-tuned Large Language Model (LLM) analyzes your pantry's contents to recommend recipes.
- **Ingredient Substitutions**: When some ingredients are missing, Intelli Foods suggests substitutions to help you make the most of what you have.
- **Clear Out the Fridge**: Recipes are tailored to help you utilize existing food, minimizing leftovers and waste.

### Sustainability Impact

By reducing expired and rotten food, Intelli Foods contributes to the global goal of minimizing food waste, aligning with the United Nations Sustainable Development Goals (SDG).

## Technologies Used

- **Frontend**: Coded in NextJS and hosted on Vercel.
- **Database**: MongoDB Atlas.
- **Backend & AI Integration**: Refer to this repo for more information. [Repo](https://github.com/intelli-foods/intellifoods_backend)

## Installation

To set up Intelli Foods locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/intelli-foods.git
   ```
2. Navigate to the project directory:
   ```bash
   cd intelli-foods
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Create a .env file in root directory, with the following content:

   ```bash
   MONGODB_URI=<Your MongoDB Atlas Database connection string>
   NEXT_IRON_COOKIE_PASSWORD=a_very_secure_32_character_long_password_12345
   ```

6. Access the app in your browser at `http://localhost:3000`.

## Usage

1. Add items to your pantry by specifying their location (fridge, freezer, or shelf) and expiry dates.
2. Use the recipe generator to get meal suggestions based on available ingredients.
3. Apply substitutions for missing ingredients as recommended by the AI.
4. Keep your pantry organized and reduce waste effectively.

## Acknowledgments

Intelli Foods is inspired by the need to reduce food waste and promote sustainability in everyday life. Special thanks to all contributors and supporters of this project.
