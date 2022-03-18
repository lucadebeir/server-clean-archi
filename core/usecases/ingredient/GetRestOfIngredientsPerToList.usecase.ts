import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class GetRestOfIngredientsPerToListUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(ingredients: any, user?: Token): Promise<Ingredient[]> {
    this.checkBusinessRules(ingredients, user);
    return await this.ingredientRepository.findRestOfIngredientsPerToList(
      ingredients
    );
  }

  private checkBusinessRules(ingredients: any, user?: Token): void {
    if (user && isAdmin(user)) {
      if (!ingredients) {
        throw new BusinessException(
          "Une liste d'ingrédients ne peut pas être nulle"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
