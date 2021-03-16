import Ingredient from "../../domain/Ingredient";

export default interface IngredientRepository {
  findAll(): Promise<Ingredient[]>;
  findById(id: any): Promise<Ingredient>;
  findRestOfIngredientsPerToList(ingredients: any): Promise<Ingredient[]>;
  findIngredientsNotInRecipe(id: any): Promise<Ingredient[]>;
}
