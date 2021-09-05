import Ingredient from "../../domain/Ingredient";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UseIngredient from "../../domain/UseIngredient";

export default class GetIngredientsByIdRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<UseIngredient[]> {
    return await this.recipeRepository.getIngredientsByIdRecipe(id);
  }
}
