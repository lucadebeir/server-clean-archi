import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";

export default interface ShoppingRepository {
  findById(pseudo: any): Promise<Shopping[]>;
  findIngredientsNotInShoppingListById(pseudo: any): Promise<Ingredient[]>;

  addIngredientToShoppingList(pseudo: any, name: string): Promise<string>;
  addIngredientsOfRecipeToShoppingList(pseudo: any, list: any): Promise<string>;

  deleteById(id: any, pseudo: any): Promise<string>;
}
