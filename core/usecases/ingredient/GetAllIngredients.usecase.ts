import Ingredient from "../../domain/Ingredient";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class GetAlIngredientsUseCase {
    constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface
  
    async execute(): Promise<Ingredient[]> {
      return await this.ingredientRepository.findAll();
    }
}