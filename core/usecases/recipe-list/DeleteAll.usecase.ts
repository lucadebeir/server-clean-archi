import RecipeListRepository from "../../ports/repositories/RecipeList.repository";

export default class DeleteAllUseCase {
  constructor(private recipeListRepository: RecipeListRepository) {}

  async execute(pseudo: any): Promise<string> {
    return await this.recipeListRepository.deleteAll(pseudo);
  }
}
