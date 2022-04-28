import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import CheckFavoriByPseudoUseCase from "../../../../core/usecases/favori/CheckFavoriByPseudo.usecase";
import CreateFavoriUseCase from "../../../../core/usecases/favori/CreateFavori.usecase";
import DeleteFavoriUseCase from "../../../../core/usecases/favori/DeleteFavori.usecase";
import FindFavorisByIdUserUsecase from "../../../../core/usecases/favori/FindFavorisByIdUser.usecase";
import FindFavorisByIdUserPerToCategoryUsecase
    from "../../../../core/usecases/favori/FindFavorisByIdUserPerToCategory.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import FavoriRepositorySQL from "../../../secondaries/mysql/repositories/FavoriRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class FavoriConfig {
  private favoriRepository: FavoriRepository = new FavoriRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();
  private categoryRepository: CategoryRepository = new CategoryRepositorySQL();

  public createFavoriUseCase(): CreateFavoriUseCase {
    return new CreateFavoriUseCase(
      this.favoriRepository,
      this.recipeRepository
    );
  }

  public getFavorisByIdUser(): FindFavorisByIdUserUsecase {
    return new FindFavorisByIdUserUsecase(this.favoriRepository);
  }

  public getFavorisByIdUserPerToCategoryUseCase(): FindFavorisByIdUserPerToCategoryUsecase {
    return new FindFavorisByIdUserPerToCategoryUsecase(
      this.favoriRepository,
      this.categoryRepository
    );
  }

  public deleteFavoriUseCase(): DeleteFavoriUseCase {
    return new DeleteFavoriUseCase(this.favoriRepository);
  }

  public checkFavoriByPseudoUseCase(): CheckFavoriByPseudoUseCase {
    return new CheckFavoriByPseudoUseCase(this.favoriRepository);
  }
}
