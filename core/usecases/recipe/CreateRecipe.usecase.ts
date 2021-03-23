import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class CreateRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(recipe: Recipe): Promise<Recipe> {
    return await this.recipeRepository.create(recipe);
  }
}
