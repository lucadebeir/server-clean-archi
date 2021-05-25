import RecipeList from "../../domain/RecipeList";

export default interface RecipeListRepository {
  findById(pseudo: any): Promise<RecipeList[]>;
  addRecipe(recipe: RecipeList): Promise<RecipeList>;
  updateState(recipe: RecipeList): Promise<string>;
  updateDay(recipe: RecipeList): Promise<string>;

  deleteById(id: any, pseudo: any): Promise<string>;
  deleteAll(pseudo: any): Promise<string>;

  existById(id: any, pseudo: any): Promise<boolean>;
  existByName(name: any, pseudo: any): Promise<boolean>;
}
