import IllustrateRecipe from "../../domain/IllustrateRecipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateImageFromRecipeUseCase {
  constructor(
    private illustrateRecipeRepository: IllustrateRecipeRepository,
    private imageRepository: ImageRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    illustrateRecipe: IllustrateRecipe,
    token?: Token
  ): Promise<string> {
    this.checkBusinessRules(illustrateRecipe, token);
    return this.illustrateRecipeRepository.updateFromRecipe(illustrateRecipe);
  }

  private checkBusinessRules(
    illustrateRecipe: IllustrateRecipe,
    token?: Token
  ): void {
    if (token && isAdmin(token)) {
      if (illustrateRecipe) {
        if (
          !illustrateRecipe.id_image ||
          !this.imageRepository.existById(illustrateRecipe.id_image)
        ) {
          throw new BusinessException("L'image doit exister");
        }
        if (
          !illustrateRecipe.id_recipe ||
          !this.recipeRepository.existById(illustrateRecipe.id_recipe)
        ) {
          throw new BusinessException("La recette doit exister");
        }
        if (!this.illustrateRecipeRepository.check(illustrateRecipe)) {
          throw new BusinessException(
            "Cette image n'existe pas dans cette recette"
          );
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
