import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import ClassifyInRepository from "../../../../core/ports/repositories/ClassifyIn.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import AddCategoryToRecipeUseCase from "../../../../core/usecases/classify-in/AddCategoryToRecipe.usecase";
import DeleteCategoryFromRecipeUseCase from "../../../../core/usecases/classify-in/DeleteCategoryFromRecipe.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import ClassifyInRepositorySQL from "../../../secondaries/mysql/repositories/ClassifyInRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class ClassifyInConfig {
  private classifyInRepository: ClassifyInRepository = new ClassifyInRepositorySQL();
  private categoryRepository: CategoryRepository = new CategoryRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public addCategoryToRecipeUseCase(): AddCategoryToRecipeUseCase {
    return new AddCategoryToRecipeUseCase(
      this.classifyInRepository,
      this.categoryRepository,
      this.recipeRepository
    );
  }

  public deleteCategoryFromRecipeUseCase(): DeleteCategoryFromRecipeUseCase {
    return new DeleteCategoryFromRecipeUseCase(
      this.classifyInRepository,
      this.categoryRepository,
      this.recipeRepository
    );
  }
}
