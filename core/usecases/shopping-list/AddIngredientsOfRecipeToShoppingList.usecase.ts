import Shopping from "../../domain/Shopping";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";

export default class AddIngredientsOfRecipeToShoppingListUseCase {
  constructor(private shoppingRepository: ShoppingRepository) {}

  async execute(pseudo: any, list: any): Promise<string> {
    return await this.shoppingRepository.addIngredientsOfRecipeToShoppingList(
      pseudo,
      list
    );
  }
}
