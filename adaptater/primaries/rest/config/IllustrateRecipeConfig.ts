import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import AddImageToRecipeUseCase from "../../../../core/usecases/illustrate-recipe/AddImageToRecipe.usecase";
import UpdateImageFromRecipeUseCase from "../../../../core/usecases/illustrate-recipe/UpdateImageFromRecipe.usecase";
import IllustrateRecipeRepositorySQL from "../../../secondaries/mysql/repositories/IllustrateRecipeRepositorySQL";
import ImageRepositorySQL from "../../../secondaries/mysql/repositories/ImageRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class CategoryConfig {
  public illustrateRecipeRepository: IllustrateRecipeRepository = new IllustrateRecipeRepositorySQL();
  public imageRepository: ImageRepository = new ImageRepositorySQL();
  public recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public addImageToRecipeUseCase(): AddImageToRecipeUseCase {
    return new AddImageToRecipeUseCase(this.illustrateRecipeRepository, this.imageRepository, this.recipeRepository);
  }

  public updateImageFromRecipeUseCase(): UpdateImageFromRecipeUseCase {
    return new UpdateImageFromRecipeUseCase(this.illustrateRecipeRepository, this.imageRepository, this.recipeRepository);
  }
}
