import Shopping from "../../domain/Shopping";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";

export default class AddIngredientToShoppingListUseCase {
  constructor(private shoppingRepository: ShoppingRepository) {}

  async execute(pseudo: any, name: string): Promise<string> {
    return await this.shoppingRepository.addIngredientToShoppingList(
      pseudo,
      name
    );
  }
}
