import Category from "../../domain/Category";
import Recipe from "../../domain/Recipe";

export default interface CategoryRepository {
  create(category?: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
  findCategoriesNotInRecipe(id: any): Promise<Category[]>;
  existById(id: any): Promise<boolean>;

  getRecipesByIdCategory(id: any): Promise<Recipe[]>;
  getRecipesByIdCategoryPerToNbView(id: any): Promise<Recipe[]>;

  deleteById(id: any): Promise<string>;
  update(category?: Category): Promise<Category>;

  checkExistInRecipes(id: any): Promise<boolean>;
  checkExistByName(name: any): Promise<boolean>;
}
