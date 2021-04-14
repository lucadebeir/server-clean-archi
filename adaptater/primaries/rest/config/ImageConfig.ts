import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import DeleteImageUseCase from "../../../../core/usecases/image/DeleteImage.usecase";
import FindImageByIdUseCase from "../../../../core/usecases/image/FindImageById.usecase";
import FindImageByRecetteUseCase from "../../../../core/usecases/image/FindImageByRecette.usecase";
import UploadImageUseCase from "../../../../core/usecases/image/UploadImage.usecase";
import ImageRepositorySQL from "../../../secondaries/mysql/repositories/ImageRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class CategoryConfig {
  private imageRepository: ImageRepository = new ImageRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public findImageByIdUseCase(): FindImageByIdUseCase {
    return new FindImageByIdUseCase(this.imageRepository);
  }

  public findImageByRecetteUseCase(): FindImageByRecetteUseCase {
    return new FindImageByRecetteUseCase(
      this.imageRepository,
      this.recipeRepository
    );
  }

  public uploadImageUseCase(): UploadImageUseCase {
    return new UploadImageUseCase(this.imageRepository);
  }

  public deleteUseCase(): DeleteImageUseCase {
    return new DeleteImageUseCase(this.imageRepository);
  }
}
