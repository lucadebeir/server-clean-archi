import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import CreateUnityUseCase from "../../../../core/usecases/unity/CreateUnity.usecase";
import DeleteUnityUseCase from "../../../../core/usecases/unity/DeleteUnity.usecase";
import FindAllUnitiesUsecase from "../../../../core/usecases/unity/FindAllUnities.usecase";
import FindUnityByIdUsecase from "../../../../core/usecases/unity/FindUnityById.usecase";
import UpdateUnityUseCase from "../../../../core/usecases/unity/UpdateUnity.usecase";
import UnityRepositorySQL from "../../../secondaries/mysql/repositories/UnityRepositorySQL";

export default class UnityConfig {
  private unityRepository: UnityRepository = new UnityRepositorySQL();

  public getAllUnitiesUseCase(): FindAllUnitiesUsecase {
    return new FindAllUnitiesUsecase(this.unityRepository);
  }

  public createUnityUseCase(): CreateUnityUseCase {
    return new CreateUnityUseCase(this.unityRepository);
  }

  public getUnityByIdUseCase(): FindUnityByIdUsecase {
    return new FindUnityByIdUsecase(this.unityRepository);
  }

  public updateUnityUseCase(): UpdateUnityUseCase {
    return new UpdateUnityUseCase(this.unityRepository);
  }

  public deleteUnityUseCase(): DeleteUnityUseCase {
    return new DeleteUnityUseCase(this.unityRepository);
  }
}
