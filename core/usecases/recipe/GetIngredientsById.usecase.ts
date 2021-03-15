import { Ingredient } from "../../domain/Ingredient";
import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetIngredientsByIdUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Ingredient[]> {
    return await this.recipeRepository.getIngredientsById(id);
  }
}
