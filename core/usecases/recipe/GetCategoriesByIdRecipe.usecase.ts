import Category from "../../domain/Category";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetCategoriesByIdRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Category[]> {
    return await this.recipeRepository.getCategoriesByIdRecipe(id);
  }
}
