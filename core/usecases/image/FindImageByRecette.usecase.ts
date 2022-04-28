import Image from "../../domain/Image";
import {BusinessException} from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class FindImageByRecetteUseCase {
  constructor(private imageRepository: ImageRepository, private recipeRepository: RecipeRepository) {}

  async execute(id: any): Promise<Image> {
    await this.checkBusinessRules(id);
    return this.imageRepository.findByRecipe(id);
  }

  private async checkBusinessRules(id: any): Promise<void> {
    if (!id) {
      throw new BusinessException("L'identifiant d'une recette est obligatoire");
    } else {
      if (!await this.recipeRepository.existById(id)) {
        throw new BusinessException("La recette n'existe pas");
      }
    }
  }
}
