import ImageDomain from "../../domain/Image.domain";

export default interface ImageRepository {
  uploadImage(file: any): Promise<string>;
  findById(id: any): Promise<ImageDomain>;
  findByRecette(id: any): Promise<ImageDomain>;
}
