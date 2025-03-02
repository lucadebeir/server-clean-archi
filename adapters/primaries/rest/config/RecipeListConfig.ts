import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import AddRecipeToRecipeListUseCase from "../../../../core/usecases/recipe-list/AddRecipeToRecipeList.usecase";
import CheckExistRecipeByPseudoUseCase from "../../../../core/usecases/recipe-list/CheckExistRecipeByPseudo.usecase";
import DeleteAllUseCase from "../../../../core/usecases/recipe-list/DeleteAll.usecase";
import DeleteByIdUseCase from "../../../../core/usecases/recipe-list/DeleteById.usecase";
import FindRecipeListByIdUsecase from "../../../../core/usecases/recipe-list/FindRecipeListById.usecase";
import UpdateStateByIdUseCase from "../../../../core/usecases/recipe-list/UpdateStateById.usecase";
import UpdateDayByIdUseCase from "../../../../core/usecases/recipe-list/UpdateDayById.usecase";
import RecipeListRepositorySQL from "../../../secondaries/mysql/repositories/RecipeListRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class RecipeListConfig {
  private recipeListRepository: RecipeListRepository =
    new RecipeListRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();

  public addRecipeToRecipeListUseCase(): AddRecipeToRecipeListUseCase {
    return new AddRecipeToRecipeListUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }

  public getRecipeListByIdUseCase(): FindRecipeListByIdUsecase {
    return new FindRecipeListByIdUsecase(
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

  public updateDayByIdUseCase(): UpdateDayByIdUseCase {
    return new UpdateDayByIdUseCase(
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

  public checkExistRecipeByPseudoUseCase(): CheckExistRecipeByPseudoUseCase {
    return new CheckExistRecipeByPseudoUseCase(
      this.recipeListRepository,
      this.userRepository
    );
  }
}
