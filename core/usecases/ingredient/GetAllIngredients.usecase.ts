import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isLogin} from "../../utils/token.service";

export default class GetAllIngredientsUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(token?: Token): Promise<Ingredient[]> {
    this.checkBusinessRules(token);
    return await this.ingredientRepository.findAll();
  }

  private checkBusinessRules(token?: Token): void {
    if (!token || !isLogin(token)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
