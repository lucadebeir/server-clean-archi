import Category from "../../domain/Category";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class FindCategoriesByIdRecipeUsecase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (id: any): Promise<Category[]> => await this.recipeRepository.getCategoriesByIdRecipe(id);
}
