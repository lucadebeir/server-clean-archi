import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import GetAllPerToNbViewUseCase from "../../../../core/usecases/recipe/GetAllPerToNbView.usecase";
import GetAllRecipesUseCase from "../../../../core/usecases/recipe/GetAllRecipes.usecase";
import GetCategoriesByIdRecipeUseCase from "../../../../core/usecases/recipe/GetCategoriesByIdRecipe.usecase";
import GetIngredientsByIdRecipeUseCase from "../../../../core/usecases/recipe/GetIngredientsByIdRecipe.usecase";
import GetLatestRecipesUseCase from "../../../../core/usecases/recipe/GetLatestRecipes.usecase";
import GetMostPopularRecipesUseCase from "../../../../core/usecases/recipe/GetMostPopularRecipes.usecase";
import GetRecipeByIdUseCase from "../../../../core/usecases/recipe/GetRecipeById.usecase";
import RepositoryRecipeSQL from "../../../secondaries/mysql/repositories/RepositoryRecipeSQL";

export default class Config {
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

  public getIngredientsByIdRecipeUseCase(): GetIngredientsByIdRecipeUseCase {
    return new GetIngredientsByIdRecipeUseCase(this.repositoryRecipe);
  }

  public getCategoriesByIdRecipeUseCase(): GetCategoriesByIdRecipeUseCase {
    return new GetCategoriesByIdRecipeUseCase(this.repositoryRecipe);
  }

  public getLatestRecipesUseCase(): GetLatestRecipesUseCase {
    return new GetLatestRecipesUseCase(this.repositoryRecipe);
  }

  public getMostPopularRecipesUseCase(): GetMostPopularRecipesUseCase {
    return new GetMostPopularRecipesUseCase(this.repositoryRecipe);
  }
}
