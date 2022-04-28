import Image from "../../domain/Image";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import ImageRepository from "../../ports/repositories/Image.repository";
import {isAdmin} from "../../utils/token.service";

export default class UploadImageUseCase {
    constructor(private imageRepository: ImageRepository) {}

    execute = async (file: Image, token?: Token): Promise<Image> => {
        await this.checkBusinessRules(token);
        return this.imageRepository.uploadImage(file);
    };

    private checkBusinessRules = async (token?: Token): Promise<void> => {
        if (token && !isAdmin(token)) throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    };
}
