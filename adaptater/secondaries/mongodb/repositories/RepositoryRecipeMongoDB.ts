import Category from "../../../../core/domain/Category";
import Ingredient from "../../../../core/domain/Ingredient";
import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";

export default class RepositoryRecipeMongoDB implements RecipeRepository {
  findAllPerToNbView(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  getIngredientsByIdRecipe(id: any): Promise<Ingredient[]> {
    throw new Error("Method not implemented.");
  }
  getCategoriesByIdRecipe(id: any): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  getLatestRecipes(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  getMostPopularRecipes(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  updateNbView(id: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  create(recipe: Recipe): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  insertIngredientsAndCategories(id: any, categories: Category[]): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
