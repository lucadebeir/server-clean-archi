import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import {isAdmin} from "../../utils/token.service";

export default class DeleteImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: any, token?: Token): Promise<string> {
    this.checkBusinessRules(id, token);
    return this.imageRepository.deleteById(id);
  }

  private checkBusinessRules(id: any, token?: Token): void {
    if(token && isAdmin(token)) {
      if (id) {
        if(!this.imageRepository.findById(id)) {
          throw new BusinessException("Cette image n'existe pas")
        }
      } else {
        throw new BusinessException("L'identifiant d'une image est obligatoire pour pouvoir la supprimer");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource")
    }
  }
}
