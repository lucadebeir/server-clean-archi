import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import CreateFavoriUseCase from "../../../../core/usecases/favori/CreateFavori.usecase";
import DeleteFavoriUseCase from "../../../../core/usecases/favori/DeleteFavori.usecase";
import GetFavorisByIdUserUseCase from "../../../../core/usecases/favori/GetFavorisByIdUser.usecase";
import GetFavorisByIdUserPerToCategoryUseCase from "../../../../core/usecases/favori/GetFavorisByIdUserPerToCategory.usecase";
import FavoriRepositorySQL from "../../../secondaries/mysql/repositories/FavoriRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class FavoriConfig {
  public favoriRepository: FavoriRepository = new FavoriRepositorySQL();
  public recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public createFavoriUseCase(): CreateFavoriUseCase {
    return new CreateFavoriUseCase(this.favoriRepository, this.recipeRepository);
  }

  public getFavorisByIdUser(): GetFavorisByIdUserUseCase {
    return new GetFavorisByIdUserUseCase(this.favoriRepository);
  }

  public getFavorisByIdUserPerToCategoryUseCase(): GetFavorisByIdUserPerToCategoryUseCase {
    return new GetFavorisByIdUserPerToCategoryUseCase(this.favoriRepository);
  }

  public deleteFavoriUseCase(): DeleteFavoriUseCase {
    return new DeleteFavoriUseCase(this.favoriRepository);
  }
}
