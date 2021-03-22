import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";

export default class AddImageToRecipeUseCase {
  constructor(private illustrateRecipeRepository: IllustrateRecipeRepository) {}

  async execute(idImage: any, idRecipe: any): Promise<string> {
    return this.illustrateRecipeRepository.addToRecette(idImage, idRecipe);
  }
}
