import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class DeleteIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(id: any): Promise<string> {
    return await this.ingredientRepository.deleteById(id);
  }
}
