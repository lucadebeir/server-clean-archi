import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import AddImageToRecipeUseCase from "../../../../core/usecases/illustrate-recipe/AddImageToRecipe.usecase";
import UpdateImageFromRecipeUseCase from "../../../../core/usecases/illustrate-recipe/UpdateImageFromRecipe.usecase";
import IllustrateRecipeRepositorySQL from "../../../secondaries/mysql/repositories/IllustrateRecipeRepositorySQL";

export default class CategoryConfig {
  public illustrateRecipeRepository: IllustrateRecipeRepository = new IllustrateRecipeRepositorySQL();

  public addImageToRecipeUseCase(): AddImageToRecipeUseCase {
    return new AddImageToRecipeUseCase(this.illustrateRecipeRepository);
  }

  public updateImageFromRecipeUseCase(): UpdateImageFromRecipeUseCase {
    return new UpdateImageFromRecipeUseCase(this.illustrateRecipeRepository);
  }
}
