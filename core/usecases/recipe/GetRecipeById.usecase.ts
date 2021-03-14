import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetAllRecipesUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Recipe> {
    return await this.recipeRepository.findById(id);
  }
}
