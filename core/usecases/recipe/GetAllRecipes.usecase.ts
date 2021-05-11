import AllRecipes from "../../domain/AllRecipes";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetAllRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(order: string, page: any, size: any): Promise<AllRecipes> {
    return await this.recipeRepository.findAll(order, page, size);
  }
}
