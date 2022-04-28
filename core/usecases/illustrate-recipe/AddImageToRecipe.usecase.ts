import IllustrateRecipe from "../../domain/IllustrateRecipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IllustrateRecipeRepository from "../../ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class AddImageToRecipeUseCase {
  constructor(private illustrateRecipeRepository: IllustrateRecipeRepository, private imageRepository: ImageRepository,
    private recipeRepository: RecipeRepository) {}

  execute = async (illustrateRecipe: IllustrateRecipe, token?: Token): Promise<string> => {
    await this.checkBusinessRules(illustrateRecipe, token);
    return this.illustrateRecipeRepository.addToRecette(illustrateRecipe);
  };

  private checkBusinessRules = async (illustrateRecipe: IllustrateRecipe, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (illustrateRecipe) {
        if (!illustrateRecipe.id_image || !await this.imageRepository.existById(illustrateRecipe.id_image)) {
          throw new BusinessException("L'image doit exister");
        }
        if (!illustrateRecipe.id_recipe || !await this.recipeRepository.existById(illustrateRecipe.id_recipe)) {
          throw new BusinessException("La recette doit exister");
        }
        if (await this.illustrateRecipeRepository.check(illustrateRecipe)) {
          throw new BusinessException("Cette image existe déjà dans cette recette");
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
