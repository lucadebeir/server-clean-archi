import RecipeListRepository from "../../ports/repositories/RecipeList.repository";

export default class DeleteByIdUseCase {
  constructor(private recipeListRepository: RecipeListRepository) {}

  async execute(id: any, pseudo: any): Promise<string> {
    return await this.recipeListRepository.deleteById(id, pseudo);
  }
}
