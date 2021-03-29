import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import { isAdmin } from "../../utils/token.service";

export default class DeleteIngredientFromRecipeUseCase {
  constructor(
    private useIngredientRepository: UseIngredientRepository,
    private ingredientRepository: IngredientRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    idRecette: any,
    idIngredient: any,
    token?: TokenDomain
  ): Promise<string> {
    this.checkBusinessRules(idRecette, idIngredient, token);
    return this.useIngredientRepository.delete(idRecette, idIngredient);
  }

  private checkBusinessRules(
    idRecette: number,
    idIngredient: number,
    token?: TokenDomain
  ): void {
    if (token && isAdmin(token)) {
      if (!idIngredient || !this.ingredientRepository.findById(idIngredient)) {
        throw new BusinessException("L'ingrédient doit exister");
      }
      if (!idRecette || !this.recipeRepository.findById(idRecette)) {
        throw new BusinessException("La recette doit exister");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
