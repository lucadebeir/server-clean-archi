import TokenDomain from "../../domain/Token.domain";
import Unity from "../../domain/Unity";
import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllUnitiesUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(user: TokenDomain): Promise<Unity[]> {
    this.checkBusinessRules(user);
    return await this.unityRepository.findAll();
  }

  private checkBusinessRules(user: TokenDomain): void {
    if (!isAdmin(user)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
