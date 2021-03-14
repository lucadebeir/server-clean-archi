import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";

export default class RepositoryRecipeMongoDB implements RecipeRepository {
  findAll(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findById(): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
