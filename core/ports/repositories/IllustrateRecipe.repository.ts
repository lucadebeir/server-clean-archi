import IllustrateRecipeDomain from "../../domain/IllustrateRecipe.domain";

export default interface IllustrateRecipeRepository {
  addToRecette(illustrateRecipe: IllustrateRecipeDomain): Promise<string>;
  updateFromRecipe(illustrateRecipe: IllustrateRecipeDomain): Promise<string>;

  check(illustrateRecipe: IllustrateRecipeDomain): Promise<boolean>;
}
