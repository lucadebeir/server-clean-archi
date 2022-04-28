import Recipe from "../../domain/Recipe";
import RecipesFilter from "../../domain/RecipesFilter";
import Token from "../../domain/Token";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {updateDataRecipe} from "../../utils/recipe";

export default class ResearchFilterUseCase {
  constructor(private recipeRepository: RecipeRepository, private favoriRepository: FavoriRepository) {}

  execute = async (data: RecipesFilter, token?: Token): Promise<Recipe[]> => {
    const result = token
        ? await this.favoriRepository.research(data, token.pseudo)
        : await this.recipeRepository.research(data);

    return result.map((recipe) => updateDataRecipe(recipe));
  };
}
