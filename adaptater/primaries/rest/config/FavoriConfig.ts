import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import CreateFavoriUseCase from "../../../../core/usecases/favori/CreateFavori.usecase";
import DeleteFavoriUseCase from "../../../../core/usecases/favori/DeleteFavori.usecase";
import GetFavorisByIdUserUseCase from "../../../../core/usecases/favori/GetFavorisByIdUser.usecase";
import GetFavorisByIdUserPerToCategorieUseCase from "../../../../core/usecases/favori/GetFavorisByIdUserPerToCategorie.usecase";
import FavoriRepositorySQL from "../../../secondaries/mysql/repositories/FavoriRepositorySQL";

export default class FavoriConfig {
  public favoriRepository: FavoriRepository = new FavoriRepositorySQL();

  public createFavoriUseCase(): CreateFavoriUseCase {
    return new CreateFavoriUseCase(this.favoriRepository);
  }

  public getFavorisByIdUser(): GetFavorisByIdUserUseCase {
    return new GetFavorisByIdUserUseCase(this.favoriRepository);
  }

  public getFavorisByIdUserPerToCategorieUseCase(): GetFavorisByIdUserPerToCategorieUseCase {
    return new GetFavorisByIdUserPerToCategorieUseCase(this.favoriRepository);
  }

  public deleteFavoriUseCase(): DeleteFavoriUseCase {
    return new DeleteFavoriUseCase(this.favoriRepository);
  }
}
