import ImageDomain from "../../domain/Image.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class FindImageByRecetteUseCase {
  constructor(
    private imageRepository: ImageRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(id: any): Promise<ImageDomain> {
    this.checkBusinessRules(id);
    return this.imageRepository.findByRecette(id);
  }

  private checkBusinessRules(id: any): void {
    if (!id) {
      throw new BusinessException(
        "L'identifiant d'une recette est obligatoire"
      );
    } else {
      if (!this.recipeRepository.existById(id)) {
        throw new BusinessException("La recette n'existe pas");
      }
    }
  }
}
