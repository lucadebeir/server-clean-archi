import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {updateDataRecipe} from "../../utils/recipe";

export default class FindMostPopularRecipesUsecase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (): Promise<Recipe[]> => {
    const result: Recipe[] = await this.recipeRepository.getMostPopularRecipes();
    result.map((recipe) => updateDataRecipe(recipe));
    return result;
  };
}
