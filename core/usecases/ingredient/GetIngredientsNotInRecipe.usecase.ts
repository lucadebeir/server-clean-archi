import Ingredient from "../../domain/Ingredient";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class GetIngredientsNotInRecipeUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Ingredient[]> {
    return await this.ingredientRepository.findIngredientsNotInRecipe(id);
  }
}
