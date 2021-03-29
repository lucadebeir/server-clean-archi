import Ingredient from "../../domain/Ingredient";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetRestOfIngredientsPerToListUseCase {
  constructor(private ingredientRepository: IngredientRepository,
    private userRepository: UserRepository) {} //constructeur avec l'interface

  async execute(ingredients: any, user?: User): Promise<Ingredient[]> {
    this.checkBusinessRules(ingredients, user)
    return await this.ingredientRepository.findRestOfIngredientsPerToList(
      ingredients
    );
  }

  private checkBusinessRules(ingredients: any, user?: User): void {
    if (user && this.userRepository.isAdmin(user)) {
      if (!ingredients) {
        throw new BusinessException("Une liste d'ingrédients ne peut pas être nulle");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
