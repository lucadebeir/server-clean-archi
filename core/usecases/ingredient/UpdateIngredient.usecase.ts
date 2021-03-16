import Ingredient from "../../domain/Ingredient";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class UpdateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(ingredient: Ingredient): Promise<Ingredient> {
    return await this.ingredientRepository.update(ingredient);
  }
}
