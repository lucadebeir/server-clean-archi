import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class DeleteUnityUseCase {
  constructor(private unityRepository: UnityRepository) {}

  async execute(id: any, user?: TokenDomain): Promise<string> {
    await this.checkBusinessRules(id, user);
    return await this.unityRepository.deleteById(id);
  }

  private async checkBusinessRules(id?: any, user?: TokenDomain): Promise<void> {
    if (user && isAdmin(user)) {
      if (id) {
        if (await this.unityRepository.findById(id)) {
          if (await this.unityRepository.checkExistInRecipes(id)) {
            throw new BusinessException(
              "Cette unité est associée à une ou plusieurs recettes"
            );
          }
        } else {
          throw new BusinessException("Cette unité n'existe pas");
        }
      } else {
        throw new TechnicalException(
          "L'identifiant d'une unité est obligatoire pour pouvoir la supprimer"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
