import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";

export default class UpdateImageFromRecipeUseCase {
  constructor(private illustrateRecipeRepository: IllustrateRecipeRepository) {}

  async execute(idImage: any, idRecipe: any): Promise<string> {
    return this.illustrateRecipeRepository.updateFromRecipe(idImage, idRecipe);
  }
}
