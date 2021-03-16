import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import GetAllIngredientsUseCase from "../../../../core/usecases/ingredient/GetAllIngredients.usecase";
import GetIngredientByIdUseCase from "../../../../core/usecases/ingredient/GetIngredientById.usecase";
import GetRestOfIngredientsPerToListUseCase from "../../../../core/usecases/ingredient/GetRestOfIngredientsPerToList.usecase";
import GetIngredientsNotInRecipeUseCase from "../../../../core/usecases/ingredient/GetIngredientsNotInRecipe.usecase";

export default class IngredientConfig {
  public ingredientRepository: IngredientRepository = new IngredientRepositorySQL();

  public getAllIngredientsUseCase(): GetAllIngredientsUseCase {
    return new GetAllIngredientsUseCase(this.ingredientRepository);
  }

  public getIngredientByIdUseCase(): GetIngredientByIdUseCase {
    return new GetIngredientByIdUseCase(this.ingredientRepository);
  }

  public getRestOfIngredientsPerToListUseCase(): GetRestOfIngredientsPerToListUseCase {
    return new GetRestOfIngredientsPerToListUseCase(this.ingredientRepository);
  }

  public getIngredientsNotInRecipeUseCase(): GetIngredientsNotInRecipeUseCase {
    return new GetIngredientsNotInRecipeUseCase(this.ingredientRepository);
  }
}
