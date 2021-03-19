import RecipeList from "../../domain/RecipeList";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";

export default class UpdateStateByIdUseCase {
  constructor(private recipeListRepository: RecipeListRepository) {}

  async execute(state: boolean, id: any, pseudo: any): Promise<RecipeList> {
    return await this.recipeListRepository.updateState(state, id, pseudo);
  }
}
