import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import FindImageByIdUseCase from "../../../../core/usecases/image/FindImageById.usecase";
import FindImageByRecetteUseCase from "../../../../core/usecases/image/FindImageByRecette.usecase";
import ImageRepositorySQL from "../../../secondaries/mysql/repositories/ImageRepositorySQL";

export default class CategoryConfig {
  public imageRepository: ImageRepository = new ImageRepositorySQL();

  public findImageByIdUseCase(): FindImageByIdUseCase {
    return new FindImageByIdUseCase(this.imageRepository);
  }

  public findImageByRecetteUseCase(): FindImageByRecetteUseCase {
    return new FindImageByRecetteUseCase(this.imageRepository);
  }
}
