import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import CreateCategoryUseCase from "../../../../core/usecases/category/CreateCategory.usecase";
import DeleteCategoryUseCase from "../../../../core/usecases/category/DeleteCategory.usecase";
import GetAllCategoriesUseCase from "../../../../core/usecases/category/GetAllCategories.usecase";
import GetCategoriesNotInRecipeUseCase from "../../../../core/usecases/category/GetCategoriesNotInRecipe.usecase";
import GetRecipesByIdCategoryUseCase from "../../../../core/usecases/category/GetRecipesByIdCategory.usecase";
import GetRecipesByIdCategoryPerToNbViewUseCase
    from "../../../../core/usecases/category/GetRecipesByIdCategoryPerToNbView.usecase";
import UpdateCategoryUseCase from "../../../../core/usecases/category/UpdateCategory.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";

export default class CategoryConfig {
  private categoryRepository: CategoryRepository = new CategoryRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getAllCategoriesUseCase(): GetAllCategoriesUseCase {
    return new GetAllCategoriesUseCase(this.categoryRepository);
  }

  public getRecipesByIdCategoryUseCase(): GetRecipesByIdCategoryUseCase {
    return new GetRecipesByIdCategoryUseCase(this.categoryRepository);
  }

  public getRecipesByIdCategoryPerToNbViewUseCase(): GetRecipesByIdCategoryPerToNbViewUseCase {
    return new GetRecipesByIdCategoryPerToNbViewUseCase(
      this.categoryRepository
    );
  }

  public getCategoriesNotInRecipeUseCase(): GetCategoriesNotInRecipeUseCase {
    return new GetCategoriesNotInRecipeUseCase(
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
