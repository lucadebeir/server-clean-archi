import RecipeList from "../../domain/RecipeList";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";

export default class AddRecipeToRecipeListUseCase {
  constructor(private recipeListRepository: RecipeListRepository) {}

  async execute(recipe: RecipeList): Promise<RecipeList> {
    return await this.recipeListRepository.addRecipe(recipe);
  }
}
