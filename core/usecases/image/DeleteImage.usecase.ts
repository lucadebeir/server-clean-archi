import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import {isAdmin} from "../../utils/token.service";

export default class DeleteImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  execute = async (id: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(id, token);
    return this.imageRepository.deleteById(id);
  };

  private checkBusinessRules = async (id: any, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (id) {
        if (!await this.imageRepository.findById(id)) {
          throw new BusinessException("Cette image n'existe pas")
        }
      } else {
        throw new BusinessException("L'identifiant d'une image est obligatoire pour pouvoir la supprimer");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource")
    }
  };
}
