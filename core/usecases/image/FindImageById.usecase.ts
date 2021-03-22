import ImageDomain from "../../domain/Image.domain";
import ImageRepository from "../../ports/repositories/Image.repository";

export default class FindImageByIdUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(file: any): Promise<ImageDomain> {
    return this.imageRepository.findById(file);
  }
}
