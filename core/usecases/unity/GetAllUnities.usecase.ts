import Unity from "../../domain/Unity";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetAllUnitiesUseCase {
  constructor(
    private unityRepository: UnityRepository,
    private userRepository: UserRepository
  ) {}

  async execute(user: User): Promise<Unity[]> {
    this.checkBusinessRules(user);
    return await this.unityRepository.findAll();
  }

  private checkBusinessRules(user: User): void {
    if (!this.userRepository.isAdmin(user)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
