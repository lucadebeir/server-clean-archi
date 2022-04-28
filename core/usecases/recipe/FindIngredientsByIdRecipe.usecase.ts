import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UseIngredient from "../../domain/UseIngredient";

export default class FindIngredientsByIdRecipeUsecase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (id: any): Promise<UseIngredient[]> => await this.recipeRepository.getIngredientsByIdRecipe(id);
}
