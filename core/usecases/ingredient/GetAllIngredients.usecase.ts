import Ingredient from "../../domain/Ingredient";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllIngredientsUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(token?: TokenDomain): Promise<Ingredient[]> {
    this.checkBusinessRules(token);
    return await this.ingredientRepository.findAll();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
