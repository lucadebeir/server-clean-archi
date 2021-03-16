import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientRepositorySQL from "../../../secondaries/mysql/repositories/IngredientRepositorySQL";
import GetAllIngredientsUseCase from "../../../../core/usecases/ingredient/GetAllIngredients.usecase";
import GetIngredientByIdUseCase from "../../../../core/usecases/ingredient/GetIngredientById.usecase";
import GetRestOfIngredientsPerToListUseCase from "../../../../core/usecases/ingredient/GetRestOfIngredientsPerToList.usecase";
import GetIngredientsNotInRecipeUseCase from "../../../../core/usecases/ingredient/GetIngredientsNotInRecipe.usecase";
import CreateIngredientUseCase from "../../../../core/usecases/ingredient/CreateIngredient.usecase";
import DeleteIngredientUseCase from "../../../../core/usecases/ingredient/DeleteIngredient.usecase";
import UpdateIngredientUseCase from "../../../../core/usecases/ingredient/UpdateIngredient.usecase";

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
