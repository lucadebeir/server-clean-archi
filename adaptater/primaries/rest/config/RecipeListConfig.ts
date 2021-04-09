import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import AddRecipeToRecipeListUseCase from "../../../../core/usecases/recipe-list/AddRecipeToRecipeList.usecase";
import DeleteAllUseCase from "../../../../core/usecases/recipe-list/DeleteAll.usecase";
import DeleteByIdUseCase from "../../../../core/usecases/recipe-list/DeleteById.usecase";
import GetRecipeListByIdUseCase from "../../../../core/usecases/recipe-list/GetRecipeListById.usecase";
import UpdateStateByIdUseCase from "../../../../core/usecases/recipe-list/UpdateStateById.usecase";
import RecipeListRepositorySQL from "../../../secondaries/mysql/repositories/RecipeListRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class RecipeListConfig {
  private recipeListRepository: RecipeListRepository = new RecipeListRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();

  public addRecipeToRecipeListUseCase(): AddRecipeToRecipeListUseCase {
    return new AddRecipeToRecipeListUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }

  public getRecipeListByIdUseCase(): GetRecipeListByIdUseCase {
    return new GetRecipeListByIdUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }

  public updateStateByIdUseCase(): UpdateStateByIdUseCase {
    return new UpdateStateByIdUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }

  public deleteByIdUseCase(): DeleteByIdUseCase {
    return new DeleteByIdUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }

  public deleteAllUseCase(): DeleteAllUseCase {
    return new DeleteAllUseCase(this.recipeListRepository, this.userRepository);
  }
}
