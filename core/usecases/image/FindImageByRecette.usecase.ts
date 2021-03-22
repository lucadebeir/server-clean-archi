import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";

export default class FindImageByRecetteUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: any): Promise<ImageDomain[]> {
    return this.imageRepository.findByRecette(id);
  }
}
