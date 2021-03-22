import ImageRepository from "../../ports/repositories/Image.repository";

export default class UploadImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(file: any): Promise<string> {
    return this.imageRepository.uploadImage(file);
  }
}
