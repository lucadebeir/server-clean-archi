import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class DeleteIngredientFromRecipeUseCase {
  constructor(private useIngredientRepository: UseIngredientRepository, private ingredientRepository: IngredientRepository,
    private recipeRepository: RecipeRepository) {}

  execute = async (idRecette: any, idIngredient: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(idRecette, idIngredient, token);
    return this.useIngredientRepository.delete(idRecette, idIngredient);
  };

  private checkBusinessRules = async (idRecette: number, idIngredient: number, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (!idIngredient || !await this.ingredientRepository.findById(idIngredient)) {
        throw new BusinessException("L'ingrédient doit exister");
      }
      if (!idRecette || !await this.recipeRepository.findById(idRecette)) {
        throw new BusinessException("La recette doit exister");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
