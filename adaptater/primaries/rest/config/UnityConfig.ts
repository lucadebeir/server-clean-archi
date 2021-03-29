import UnityRepository from "../../../../core/ports/repositories/Unity.repository";
import { UserRepository } from "../../../../core/ports/repositories/User.repository";
import CreateUnityUseCase from "../../../../core/usecases/unity/CreateUnity.usecase";
import DeleteUnityUseCase from "../../../../core/usecases/unity/DeleteUnity.usecase";
import GetAllUnitiesUseCase from "../../../../core/usecases/unity/GetAllUnities.usecase";
import GetUnityByIdUseCase from "../../../../core/usecases/unity/GetUnityById.usecase";
import UpdateUnityUseCase from "../../../../core/usecases/unity/UpdateUnity.usecase";
import UnityRepositorySQL from "../../../secondaries/mysql/repositories/UnityRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class UnityConfig {
  public unityRepository: UnityRepository = new UnityRepositorySQL();
  public userRepository: UserRepository = new UserRepositorySQL();
  
  public getAllUnitiesUseCase(): GetAllUnitiesUseCase {
    return new GetAllUnitiesUseCase(this.unityRepository, this.userRepository);
  }

  public createUnityUseCase(): CreateUnityUseCase {
    return new CreateUnityUseCase(this.unityRepository, this.userRepository);
  }

  public getUnityByIdUseCase(): GetUnityByIdUseCase {
    return new GetUnityByIdUseCase(this.unityRepository, this.userRepository);
  }

  public updateUnityUseCase(): UpdateUnityUseCase {
    return new UpdateUnityUseCase(this.unityRepository, this.userRepository);
  }

  public deleteUnityUseCase(): DeleteUnityUseCase {
    return new DeleteUnityUseCase(this.unityRepository, this.userRepository);
  }
}
