export default interface IllustrateRecipeRepository {
  addToRecette(idImage: any, idRecipe: any): Promise<string>;
  updateFromRecipe(idImage: any, idRecipe: any): Promise<string>;
}
