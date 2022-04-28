import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import CreateCategoryUseCase from "../../../../core/usecases/category/CreateCategory.usecase";
import DeleteCategoryUseCase from "../../../../core/usecases/category/DeleteCategory.usecase";
import FindAllCategoriesUsecase from "../../../../core/usecases/category/FindAllCategories.usecase";
import FindCategoriesNotInRecipeUsecase from "../../../../core/usecases/category/FindCategoriesNotInRecipe.usecase";
import FindRecipesByIdCategoryUsecase from "../../../../core/usecases/category/FindRecipesByIdCategory.usecase";
import FindRecipesByIdCategoryPerToNbViewUsecase
    from "../../../../core/usecases/category/FindRecipesByIdCategoryPerToNbView.usecase";
import UpdateCategoryUseCase from "../../../../core/usecases/category/UpdateCategory.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class CategoryConfig {
  private categoryRepository: CategoryRepository = new CategoryRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getAllCategoriesUseCase(): FindAllCategoriesUsecase {
    return new FindAllCategoriesUsecase(this.categoryRepository);
  }

  public getRecipesByIdCategoryUseCase(): FindRecipesByIdCategoryUsecase {
    return new FindRecipesByIdCategoryUsecase(this.categoryRepository);
  }

  public getRecipesByIdCategoryPerToNbViewUseCase(): FindRecipesByIdCategoryPerToNbViewUsecase {
    return new FindRecipesByIdCategoryPerToNbViewUsecase(
      this.categoryRepository
    );
  }

  public getCategoriesNotInRecipeUseCase(): FindCategoriesNotInRecipeUsecase {
    return new FindCategoriesNotInRecipeUsecase(
      this.categoryRepository,
      this.recipeRepository
    );
  }

  public createCategoryUseCase(): CreateCategoryUseCase {
    return new CreateCategoryUseCase(this.categoryRepository);
  }

  public deleteCategoryUseCase(): DeleteCategoryUseCase {
    return new DeleteCategoryUseCase(this.categoryRepository);
  }

  public updateCategoryUseCase(): UpdateCategoryUseCase {
    return new UpdateCategoryUseCase(this.categoryRepository);
  }
}
