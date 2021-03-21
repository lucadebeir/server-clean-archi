import UseIngredient from "../../domain/UseIngredient";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";

export default class AddIngredientToRecipeUseCase {
  constructor(private useIngredientRepository: UseIngredientRepository) {}

  async execute(useIngredient: UseIngredient): Promise<string> {
    return this.useIngredientRepository.addIngredientToRecipe(useIngredient);
  }
}
