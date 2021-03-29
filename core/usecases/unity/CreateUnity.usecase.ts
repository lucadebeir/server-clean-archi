import TokenDomain from "../../domain/Token.domain";
import Unity from "../../domain/Unity";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class CreateUnityUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(unity?: Unity, user?: TokenDomain): Promise<Unity> {
    this.checkBusinessRules(unity, user);
    return await this.unityRepository.create(unity);
  }

  private checkBusinessRules(unity?: Unity, user?: TokenDomain): void {
    if (user && isAdmin(user)) {
      if (unity) {
        if (!unity.libelleUnite) {
          throw new BusinessException("Le libellé d'une unité est obligatoire");
        } else {
          if (this.unityRepository.checkExistByName(unity.libelleUnite)) {
            throw new BusinessException(
              "Ce libellé est déjà utilisé par une unité"
            );
          }
          if (unity.libelleUnite.length > 19) {
            throw new BusinessException(
              "Le libellé d'une unité ne peut pas comporter plus de 19 caractères"
            );
          }
        }
      } else {
        throw new TechnicalException("L'unité est indéfinie");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
