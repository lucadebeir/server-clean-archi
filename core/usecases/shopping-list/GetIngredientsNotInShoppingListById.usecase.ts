import Ingredient from "../../domain/Ingredient";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";

export default class GetIngredientsNotInShoppingListByIdUseCase {
  constructor(private shoppingRepository: ShoppingRepository) {}

  async execute(pseudo: any): Promise<Ingredient[]> {
    return await this.shoppingRepository.findIngredientsNotInShoppingListById(
      pseudo
    );
  }
}
