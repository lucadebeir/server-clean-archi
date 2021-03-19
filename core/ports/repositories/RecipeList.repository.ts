import RecipeList from "../../domain/RecipeList";

export default interface RecipeListRepository {
  findById(pseudo: any): Promise<RecipeList[]>;
  addRecipe(recipe: RecipeList): Promise<RecipeList>;
  updateState(state: boolean, id: any, pseudo: any): Promise<RecipeList>;

  deleteById(id: any, pseudo: any): Promise<string>;
  deleteAll(pseudo: any): Promise<string>;
}
