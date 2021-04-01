import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import CreateRecipeUseCase from "../../../../core/usecases/recipe/CreateRecipe.usecase";
import GetAllPerToNbViewUseCase from "../../../../core/usecases/recipe/GetAllPerToNbView.usecase";
import GetAllRecipesUseCase from "../../../../core/usecases/recipe/GetAllRecipes.usecase";
import GetCategoriesByIdRecipeUseCase from "../../../../core/usecases/recipe/GetCategoriesByIdRecipe.usecase";
import GetIngredientsByIdRecipeUseCase from "../../../../core/usecases/recipe/GetIngredientsByIdRecipe.usecase";
import GetLatestRecipesUseCase from "../../../../core/usecases/recipe/GetLatestRecipes.usecase";
import GetMostPopularRecipesUseCase from "../../../../core/usecases/recipe/GetMostPopularRecipes.usecase";
import GetRecipeByIdUseCase from "../../../../core/usecases/recipe/GetRecipeById.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UnityRepositorySQL from "../../../secondaries/mysql/repositories/UnityRepositorySQL";

export default class RecipeConfig {
  public recipeRepository: RecipeRepository = new RecipeRepositorySQL();
  public categoryRepository: CategoryRepository = new CategoryRepositorySQL();
  public ingredientRepository: IngredientRepository = new IngredientRepositorySQL();
  public unityRepository: UnityRepository = new UnityRepositorySQL();

  public getAllRecipeUseCase(): GetAllRecipesUseCase {
    return new GetAllRecipesUseCase(this.recipeRepository);
  }

  public getAllPerToNbViewUseCase(): GetAllPerToNbViewUseCase {
    return new GetAllPerToNbViewUseCase(this.recipeRepository);
  }

  public getRecipeByIdUseCase(): GetRecipeByIdUseCase {
    return new GetRecipeByIdUseCase(this.recipeRepository);
  }

  public getIngredientsByIdRecipeUseCase(): GetIngredientsByIdRecipeUseCase {
    return new GetIngredientsByIdRecipeUseCase(this.recipeRepository);
  }

  public getCategoriesByIdRecipeUseCase(): GetCategoriesByIdRecipeUseCase {
    return new GetCategoriesByIdRecipeUseCase(this.recipeRepository);
  }

  public getLatestRecipesUseCase(): GetLatestRecipesUseCase {
    return new GetLatestRecipesUseCase(this.recipeRepository);
  }

  public getMostPopularRecipesUseCase(): GetMostPopularRecipesUseCase {
    return new GetMostPopularRecipesUseCase(this.recipeRepository);
  }

  public createRecipeUseCase(): CreateRecipeUseCase {
    return new CreateRecipeUseCase(
      this.recipeRepository,
      this.categoryRepository,
      this.ingredientRepository,
      this.unityRepository
    );
  }
}
