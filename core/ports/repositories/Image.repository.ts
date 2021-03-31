import ImageDomain from "../../domain/Image.domain";

export default interface ImageRepository {
  uploadImage(file: any): Promise<ImageDomain>;
  findById(id: any): Promise<ImageDomain>;
  findByRecette(id: any): Promise<ImageDomain>;
  deleteById(id: any): Promise<string>;

  checkExistByName(name: any): Promise<boolean>;
  existById(id: any): Promise<boolean>;
}
