import TokenDomain from "../../domain/Token.domain";
import Unity from "../../domain/Unity";
import { BusinessException } from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetUnityByIdUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(id: any, user?: TokenDomain): Promise<Unity> {
    this.checkBusinessRules(id, user);
    return await this.unityRepository.findById(id);
  }

  private checkBusinessRules(id: any, user?: TokenDomain): void {
    if (user && isAdmin(user)) {
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
