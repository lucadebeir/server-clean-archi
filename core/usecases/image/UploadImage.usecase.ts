import ImageDomain from "../../domain/Image.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import { isAdmin } from "../../utils/token.service";

export default class UploadImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(file: any, token?: TokenDomain): Promise<ImageDomain> {
    await this.checkBusinessRules(file, token);
    return this.imageRepository.uploadImage(file);
  }

  private async checkBusinessRules(file: any, token?: TokenDomain): Promise<void> {
    if (token && isAdmin(token)) {
      if (file) {
        if (await this.imageRepository.checkExistByName(file.nameImage)) {
          throw new BusinessException("Cette image existe déjà");
        }
      } else {
        throw new BusinessException(
            "Une image est obligatoire pour pouvoir la télécharger"
        );
      }
    } else {
      throw new BusinessException(
          "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
