import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import AddRecipeToRecipeListUseCase from "../../../../core/usecases/recipe-list/AddRecipeToRecipeList.usecase";
import DeleteAllUseCase from "../../../../core/usecases/recipe-list/DeleteAll.usecase";
import DeleteByIdUseCase from "../../../../core/usecases/recipe-list/DeleteById.usecase";
import GetRecipeListByIdUseCase from "../../../../core/usecases/recipe-list/GetRecipeListByID.usecase";
import UpdateStateByIdUseCase from "../../../../core/usecases/recipe-list/UpdateStateById.usecase";
import RecipeListRepositorySQL from "../../../secondaries/mysql/repositories/RecipeListRepositorySQL";

export default class RecipeListConfig {
  public recipeListRepository: RecipeListRepository = new RecipeListRepositorySQL();

  public addRecipeToRecipeListUseCase(): AddRecipeToRecipeListUseCase {
    return new AddRecipeToRecipeListUseCase(this.recipeListRepository);
  }

  public getRecipeListByIdUseCase(): GetRecipeListByIdUseCase {
    return new GetRecipeListByIdUseCase(this.recipeListRepository);
  }

  public updateStateByIdUseCase(): UpdateStateByIdUseCase {
    return new UpdateStateByIdUseCase(this.recipeListRepository);
  }

  public deleteByIdUseCase(): DeleteByIdUseCase {
    return new DeleteByIdUseCase(this.recipeListRepository);
  }

  public deleteAllUseCase(): DeleteAllUseCase {
    return new DeleteAllUseCase(this.recipeListRepository);
  }
}
