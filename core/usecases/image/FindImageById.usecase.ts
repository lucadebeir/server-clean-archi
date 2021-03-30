import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";

export default class FindImageByIdUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: any): Promise<ImageDomain> {
    this.checkBusinessRules(id);
    return this.imageRepository.findById(id);
  }

  private checkBusinessRules(id: any): void {
    if (!id) {
      throw new Error("L'identifiant d'une image est obligatoire");
    }
  }
}
