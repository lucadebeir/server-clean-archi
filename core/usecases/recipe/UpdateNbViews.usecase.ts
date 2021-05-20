import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class UpdateNbViewsUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<string> {
    return await this.recipeRepository.updateNbView(id);
  }
}
