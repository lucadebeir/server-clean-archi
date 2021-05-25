import Recipe from "../../domain/Recipe";
import RecipesFilterDomain from "../../domain/RecipesFilter.domain";
import TokenDomain from "../../domain/Token.domain";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class ResearchFilterUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private favoriRepository: FavoriRepository
  ) {}

  execute = async (
    data: RecipesFilterDomain,
    token?: TokenDomain
  ): Promise<Recipe[]> => {
    if (token) {
      return await this.favoriRepository.research(data, token.pseudo);
    }
    return await this.recipeRepository.research(data);
  };
}
