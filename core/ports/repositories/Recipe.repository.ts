import Category from "../../domain/Category.domain";
import Ingredient from "../../domain/Ingredient";
import Recipe from "../../domain/Recipe";

export default interface RecipeRepository {
  findAll(order: string): Promise<Recipe[]>;
  findAllPerToNbView(): Promise<Recipe[]>;
  findById(id: any): Promise<Recipe>;

  getIngredientsByIdRecipe(id: any): Promise<Ingredient[]>;
  getCategoriesByIdRecipe(id: any): Promise<Category[]>;
  getLatestRecipes(): Promise<Recipe[]>;
  getMostPopularRecipes(): Promise<Recipe[]>;

  updateNbView(id: any): Promise<string>;
  deleteById(id: any): Promise<string>;

  create(recipe?: Recipe): Promise<Recipe>;

  existById(id: any): Promise<boolean>;
  existByName(name: any): Promise<boolean>;
  useInMenu(id: any): Promise<boolean>;
  useInRecipeList(id: any): Promise<boolean>;
}
