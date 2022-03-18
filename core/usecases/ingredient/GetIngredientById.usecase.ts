import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class GetIngredientByIdUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(id: any, user?: Token): Promise<Ingredient> {
    this.checkBusinessRules(id, user);
    return await this.ingredientRepository.findById(id);
  }

  private checkBusinessRules(id: any, user?: Token): void {
    if (user && isAdmin(user)) {
      if (!id) {
        throw new BusinessException("L'id d'un ingrédient est obligatoire");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
