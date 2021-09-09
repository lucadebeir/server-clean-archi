import Category from "../../../../core/domain/Category.domain";
import Ingredient from "../../../../core/domain/Ingredient";
import Recipe from "../../../../core/domain/Recipe";
import RecipesFilterDomain from "../../../../core/domain/RecipesFilter.domain";
import UseIngredient from "../../../../core/domain/UseIngredient";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";

export default class RepositoryRecipeMongoDB implements RecipeRepository {
  update(recipe: Recipe): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  existById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  existByName(name: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  useInMenu(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  useInRecipeList(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  research(data: RecipesFilterDomain): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findAllPerToNbView(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  getIngredientsByIdRecipe(id: any): Promise<UseIngredient[]> {
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
  insertIngredientsAndCategories(
    id: any,
    categories: Category[]
  ): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
