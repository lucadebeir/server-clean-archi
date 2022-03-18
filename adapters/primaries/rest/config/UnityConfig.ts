import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import CreateUnityUseCase from "../../../../core/usecases/unity/CreateUnity.usecase";
import DeleteUnityUseCase from "../../../../core/usecases/unity/DeleteUnity.usecase";
import GetAllUnitiesUseCase from "../../../../core/usecases/unity/GetAllUnities.usecase";
import GetUnityByIdUseCase from "../../../../core/usecases/unity/GetUnityById.usecase";
import UpdateUnityUseCase from "../../../../core/usecases/unity/UpdateUnity.usecase";
import UnityRepositorySQL from "../../../secondaries/mysql/repositories/UnityRepositorySQL";

export default class UnityConfig {
  private unityRepository: UnityRepository = new UnityRepositorySQL();

  public getAllUnitiesUseCase(): GetAllUnitiesUseCase {
    return new GetAllUnitiesUseCase(this.unityRepository);
  }

  public createUnityUseCase(): CreateUnityUseCase {
    return new CreateUnityUseCase(this.unityRepository);
  }

  public getUnityByIdUseCase(): GetUnityByIdUseCase {
    return new GetUnityByIdUseCase(this.unityRepository);
  }

  public updateUnityUseCase(): UpdateUnityUseCase {
    return new UpdateUnityUseCase(this.unityRepository);
  }

  public deleteUnityUseCase(): DeleteUnityUseCase {
    return new DeleteUnityUseCase(this.unityRepository);
  }
}
