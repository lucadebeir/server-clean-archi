import Image from "../../domain/Image";

export default interface ImageRepository {
  uploadImage(image: Image): Promise<Image>;
  findById(id: any): Promise<Image>;
  findByRecipe(id: any): Promise<Image>;
  deleteById(id: any): Promise<string>;

  checkExistByName(name: any): Promise<boolean>;
  existById(id: any): Promise<boolean>;
}
