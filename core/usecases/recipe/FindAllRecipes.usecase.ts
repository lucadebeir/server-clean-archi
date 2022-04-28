import Recipe from "../../domain/Recipe";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {updateDataRecipe} from "../../utils/recipe";

export default class FindAllRecipesUsecase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (order: string): Promise<Recipe[]> => {
    const result = await this.recipeRepository.findAll(order);
    result.map((recipe) => updateDataRecipe(recipe));
    return result;
  };
}
