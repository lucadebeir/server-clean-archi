import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class GetIngredientsNotInRecipeUseCase {
  constructor(
    private ingredientRepository: IngredientRepository,
    private recipeRepository: RecipeRepository
  ) {} //constructeur avec l'interface

  async execute(id: any, user?: Token): Promise<Ingredient[]> {
    this.checkBusinessRules(id, user);
    return await this.ingredientRepository.findIngredientsNotInRecipe(id);
  }

  private checkBusinessRules(id: any, user?: Token): void {
    if (user && isAdmin(user)) {
      if (!id) {
        throw new BusinessException(
          "L'identifiant d'une recette est obligatoire"
        );
      } else {
        if (!this.recipeRepository.existById(id)) {
          throw new BusinessException(
            "L'identifiant " +
              id +
              " ne correspond à aucune ressource existante."
          );
        }
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
