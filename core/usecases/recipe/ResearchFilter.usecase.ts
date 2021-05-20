import Recipe from "../../domain/Recipe";
import RecipesFilterDomain from "../../domain/RecipesFilter.domain";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class ResearchFilterUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  execute = async (data: RecipesFilterDomain): Promise<Recipe[]> => {
    return await this.recipeRepository.research(data);
  };
}
