import Ingredient from "../../domain/Ingredient";

export default interface IngredientRepository {
  create(ingredient?: Ingredient): Promise<Ingredient>;
  findAll(): Promise<Ingredient[]>;
  findById(id: any): Promise<Ingredient>;
  existById(id: any): Promise<boolean>;
  findRestOfIngredientsPerToList(id: any): Promise<Ingredient[]>;
  findIngredientsNotInRecipe(id: any): Promise<Ingredient[]>;

  deleteById(id: any): Promise<string>;
  update(ingredient?: Ingredient): Promise<Ingredient>;

  checkExistByName(name: any): Promise<boolean>;
  checkExistInRecipes(id: any): Promise<boolean>;
}
