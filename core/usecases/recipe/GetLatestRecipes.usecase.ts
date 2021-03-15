import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetLatestRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(): Promise<Recipe[]> {
    return await this.recipeRepository.getLatestRecipes();
  }
}
