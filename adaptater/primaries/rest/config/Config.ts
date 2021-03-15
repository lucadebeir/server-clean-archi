import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import GetAllPerToNbViewUseCase from "../../../../core/usecases/recipe/GetAllPerToNbView.usecase";
import GetAllRecipesUseCase from "../../../../core/usecases/recipe/GetAllRecipes.usecase";
import GetIngredientsByIdUseCase from "../../../../core/usecases/recipe/GetIngredientsById.usecase";
import GetLatestRecipesUseCase from "../../../../core/usecases/recipe/GetLatestRecipes.usecase";
import GetMostPopularRecipesUseCase from "../../../../core/usecases/recipe/GetMostPopularRecipes.usecase";
import GetRecipeByIdUseCase from "../../../../core/usecases/recipe/GetRecipeById.usecase";
import RepositoryRecipeSQL from "../../../secondaries/mysql/repositories/RepositoryRecipeSQL";

class Config {
  public repositoryRecipe: RecipeRepository = new RepositoryRecipeSQL();

  public getAllRecipeUseCase(): GetAllRecipesUseCase {
    return new GetAllRecipesUseCase(this.repositoryRecipe);
  }

  public getAllPerToNbViewUseCase(): GetAllPerToNbViewUseCase {
    return new GetAllPerToNbViewUseCase(this.repositoryRecipe);
  }

  public getRecipeByIdUseCase(): GetRecipeByIdUseCase {
    return new GetRecipeByIdUseCase(this.repositoryRecipe);
  }

  public getIngredientsByIdUseCase(): GetIngredientsByIdUseCase {
    return new GetIngredientsByIdUseCase(this.repositoryRecipe);
  }

  public getLatestRecipesUseCase(): GetLatestRecipesUseCase {
    return new GetLatestRecipesUseCase(this.repositoryRecipe);
  }

  public getMostPopularRecipesUseCase(): GetMostPopularRecipesUseCase {
    return new GetMostPopularRecipesUseCase(this.repositoryRecipe);
  }
}

export = Config;
