import Unity from "../../domain/Unity";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetUnityByIdUseCase {
  constructor(
    private unityRepository: UnityRepository,
    private userRepository: UserRepository
  ) {}

  async execute(id: any, user?: User): Promise<Unity> {
    this.checkBusinessRules(id, user);
    return await this.unityRepository.findById(id);
  }

  private checkBusinessRules(id: any, user?: User): void {
    if (user && this.userRepository.isAdmin(user)) {
      if (!id) {
        throw new BusinessException("L'id d'une unité est obligatoire");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
