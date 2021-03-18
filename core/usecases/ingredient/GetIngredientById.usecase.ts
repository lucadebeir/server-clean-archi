import Ingredient from "../../domain/Ingredient";
import { BusinessException } from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class GetIngredientByIdUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Ingredient> {
    if (id) {
      return await this.ingredientRepository.findById(id);
    } else {
      throw new BusinessException("L'id d'un ingrédient est obligatoire");
    }
  }
}
