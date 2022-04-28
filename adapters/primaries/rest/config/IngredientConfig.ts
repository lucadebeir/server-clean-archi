import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import FindAllIngredientsUsecase from "../../../../core/usecases/ingredient/FindAllIngredients.usecase";
import FindIngredientByIdUsecase from "../../../../core/usecases/ingredient/FindIngredientById.usecase";
import FindRestOfIngredientsPerToListUsecase
    from "../../../../core/usecases/ingredient/FindRestOfIngredientsPerToList.usecase";
import FindIngredientsNotInRecipeUsecase from "../../../../core/usecases/ingredient/FindIngredientsNotInRecipe.usecase";
import CreateIngredientUseCase from "../../../../core/usecases/ingredient/CreateIngredient.usecase";
import DeleteIngredientUseCase from "../../../../core/usecases/ingredient/DeleteIngredient.usecase";
import UpdateIngredientUseCase from "../../../../core/usecases/ingredient/UpdateIngredient.usecase";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class IngredientConfig {
  private ingredientRepository: IngredientRepository = new IngredientRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getAllIngredientsUseCase(): FindAllIngredientsUsecase {
    return new FindAllIngredientsUsecase(this.ingredientRepository);
  }

  public getIngredientByIdUseCase(): FindIngredientByIdUsecase {
    return new FindIngredientByIdUsecase(this.ingredientRepository);
  }

  public getRestOfIngredientsPerToListUseCase(): FindRestOfIngredientsPerToListUsecase {
    return new FindRestOfIngredientsPerToListUsecase(this.ingredientRepository);
  }

  public getIngredientsNotInRecipeUseCase(): FindIngredientsNotInRecipeUsecase {
    return new FindIngredientsNotInRecipeUsecase(
      this.ingredientRepository,
      this.recipeRepository
    );
  }

  public createIngredientUseCase(): CreateIngredientUseCase {
    return new CreateIngredientUseCase(this.ingredientRepository);
  }

  public deleteIngredientUseCase(): DeleteIngredientUseCase {
    return new DeleteIngredientUseCase(this.ingredientRepository);
  }

  public updateIngredientUseCase(): UpdateIngredientUseCase {
    return new UpdateIngredientUseCase(this.ingredientRepository);
  }
}
