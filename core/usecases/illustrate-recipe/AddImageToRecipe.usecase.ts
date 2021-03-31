import IllustrateRecipeDomain from "../../domain/IllustrateRecipe.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { isAdmin } from "../../utils/token.service";

export default class AddImageToRecipeUseCase {
  constructor(
    private illustrateRecipeRepository: IllustrateRecipeRepository,
    private imageRepository: ImageRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    illustrateRecipe: IllustrateRecipeDomain,
    token?: TokenDomain
  ): Promise<string> {
    this.checkBusinessRules(illustrateRecipe, token);
    return this.illustrateRecipeRepository.addToRecette(illustrateRecipe);
  }

  private checkBusinessRules(
    illustrateRecipe: IllustrateRecipeDomain,
    token?: TokenDomain
  ): void {
    if (token && isAdmin(token)) {
      if (illustrateRecipe) {
        if (
          !illustrateRecipe.idImage ||
          !this.imageRepository.existById(illustrateRecipe.idImage)
        ) {
          throw new BusinessException("L'image doit exister");
        }
        if (
          !illustrateRecipe.idRecette ||
          !this.recipeRepository.existById(illustrateRecipe.idRecette)
        ) {
          throw new BusinessException("La recette doit exister");
        }
        if (this.illustrateRecipeRepository.check(illustrateRecipe)) {
          throw new BusinessException(
            "Cette image existe déjà dans cette recette"
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
