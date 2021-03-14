import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import GetAllRecipesUseCase from "../../../../core/usecases/recipe/GetAllRecipes.usecase";
import RepositoryRecipeSQL from "../../../secondaries/mysql/repositories/RepositoryRecipeSQL";

class Config {
  static getAllRecipeUseCase() {
    throw new Error("Method not implemented.");
  }
  public repositoryRecipe: RecipeRepository = new RepositoryRecipeSQL();

  public getAllRecipeUseCase(): GetAllRecipesUseCase {
    return new GetAllRecipesUseCase(this.repositoryRecipe);
  }
}

export = Config;
