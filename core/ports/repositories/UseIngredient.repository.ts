import UseIngredient from "../../domain/UseIngredient";

export default interface UseIngredientRepository {
  addIngredientToRecipe(useIngredient: UseIngredient): Promise<string>;
  update(useIngredient: UseIngredient): Promise<string>;
  delete(idRecette: any, idIngredient: any): Promise<string>;

  check(useIngredient: UseIngredient): Promise<boolean>;
}
