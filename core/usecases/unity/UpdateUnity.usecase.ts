import Token from "../../domain/Token";
import Unity from "../../domain/Unity";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateUnityUseCase {
  constructor(private unityRepository: UnityRepository) {}

  execute = async (unity?: Unity, user?: Token): Promise<Unity> => {
    await this.checkBusinessRules(unity, user);
    return await this.unityRepository.update(unity);
  };

  private checkBusinessRules = async (unity?: Unity, user?: Token): Promise<void> => {
    if (user && isAdmin(user)) {
      if (unity) {
        if (!unity.id) {
          throw new TechnicalException("L'identifiant d'une unité est obligatoire pour pouvoir la modifier");
        } else {
          if (await this.unityRepository.findById(unity.id)) {
            if (!unity.name) {
              throw new BusinessException("Le libellé d'une unité est obligatoire");
            } else {
              if (await this.unityRepository.checkExistByName(unity.name)) {
                throw new BusinessException("Ce libellé est déjà utilisé par une unité");
              }
              if (unity.name.length > 19) {
                throw new BusinessException("Une unité ne peut pas comporter plus de 19 caractères");
              }
            }
          } else {
            throw new BusinessException("Cette unité n'existe pas");
          }
        }
      } else {
        throw new TechnicalException("L'unité est indéfinie");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
