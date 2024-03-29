import { RecipeWithInformation } from "./Recipe";

export interface SearchResponse {
  number: number
  offset: number
  results: RecipeWithInformation[]
  totalResults: number
}