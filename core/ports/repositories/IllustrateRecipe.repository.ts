import IllustrateRecipe from "../../domain/IllustrateRecipe";

export default interface IllustrateRecipeRepository {
  addToRecette(illustrateRecipe: IllustrateRecipe): Promise<string>;
  updateFromRecipe(illustrateRecipe: IllustrateRecipe): Promise<string>;

  check(illustrateRecipe: IllustrateRecipe): Promise<boolean>;
}
