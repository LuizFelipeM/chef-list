import { AnalyzedInstructions } from "./AnalyzedInstructions";
import { Ingredient } from "./Ingredient";

export interface BaseRecipe {
  id: number;
  image: string;
  imageType: string;
  title: string;
}

export interface RecipeWithIngredients extends BaseRecipe {
  likes: number;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
}

export interface RecipeWithInformation extends BaseRecipe {
  vegetarian: boolean,
  vegan: boolean,
  glutenFree: boolean,
  dairyFree: boolean,
  veryHealthy: boolean,
  cheap: boolean,
  veryPopular: boolean,
  sustainable: boolean,
  lowFodmap: boolean,
  weightWatcherSmartPoints: number,
  gaps: string
  preparationMinutes: number,
  cookingMinutes: number,
  aggregateLikes: number,
  healthScore: number,
  creditsText: string
  sourceName: string
  pricePerServing: number,
  readyInMinutes: number,
  servings: number,
  sourceUrl: string
  summary: string
  cuisines: string[],
  dishTypes: string[],
  diets: string[],
  occasions: string[],
  analyzedInstructions: AnalyzedInstructions,
  spoonacularScore: number,
  spoonacularSourceUrl: string
}
