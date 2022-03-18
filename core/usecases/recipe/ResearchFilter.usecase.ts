import Recipe from "../../domain/Recipe";
import RecipesFilter from "../../domain/RecipesFilter";
import Token from "../../domain/Token";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class ResearchFilterUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private favoriRepository: FavoriRepository
  ) {}

  execute = async (
    data: RecipesFilter,
    token?: Token
  ): Promise<Recipe[]> => {
    if (token) {
      return await this.favoriRepository.research(data, token.pseudo);
    }
    return await this.recipeRepository.research(data);
  };
}
