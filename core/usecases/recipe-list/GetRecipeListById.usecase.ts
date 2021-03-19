import RecipeList from "../../domain/RecipeList";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";

export default class GetRecipeListByIdUseCase {
  constructor(private recipeListRepository: RecipeListRepository) {}

  async execute(pseudo: any): Promise<RecipeList[]> {
    return await this.recipeListRepository.findById(pseudo);
  }
}
