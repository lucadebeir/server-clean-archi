import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";

export default interface ShoppingRepository {
  findById(pseudo: any): Promise<Shopping[]>;
  findIngredientsNotInShoppingListById(pseudo: any): Promise<Ingredient[]>;

  addIngredientToShoppingList(shopping: Shopping): Promise<string>;

  deleteById(id: any): Promise<string>;

  exist(pseudo: any, name: any): Promise<boolean>;
}
