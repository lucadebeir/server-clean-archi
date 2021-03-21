import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";

export default class DeleteIngredientFromRecipeUseCase {
  constructor(private useIngredientRepository: UseIngredientRepository) {}

  async execute(idRecette: any, idIngredient: any): Promise<string> {
    return this.useIngredientRepository.delete(idRecette, idIngredient);
  }
}
