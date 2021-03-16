import Ingredient from "../../domain/Ingredient";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";

export default class GetRestOfIngredientsPerToListUseCase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  async execute(ingredients: any): Promise<Ingredient[]> {
    return await this.ingredientRepository.findRestOfIngredientsPerToList(
      ingredients
    );
  }
}
