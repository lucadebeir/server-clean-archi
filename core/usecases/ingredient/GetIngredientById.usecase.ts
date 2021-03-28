import Ingredient from "../../domain/Ingredient";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetIngredientByIdUseCase {
  constructor(
    private ingredientRepository: IngredientRepository,
    private userRepository: UserRepository
  ) {} //constructeur avec l'interface

  async execute(id: any, user?: User): Promise<Ingredient> {
    this.checkBusinessRules(id, user);
    return await this.ingredientRepository.findById(id);
  }

  private checkBusinessRules(id: any, user?: User): void {
    if (user && this.userRepository.isAdmin(user)) {
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
