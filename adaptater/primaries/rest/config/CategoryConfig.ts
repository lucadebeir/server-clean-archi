import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import { UserRepository } from "../../../../core/ports/repositories/User.repository";
import CreateCategoryUseCase from "../../../../core/usecases/category/CreateCategory.usecase";
import DeleteCategoryUseCase from "../../../../core/usecases/category/DeleteCategory.usecase";
import GetAllCategoriesUseCase from "../../../../core/usecases/category/GetAllCategories.usecase";
import GetCategoriesNotInRecipeUseCase from "../../../../core/usecases/category/GetCategoriesNotInRecipe.usecase";
import GetRecipesByIdCategoryUseCase from "../../../../core/usecases/category/GetRecipesByIdCategory.usecase";
import GetRecipesByIdCategoryPerToNbViewUseCase from "../../../../core/usecases/category/GetRecipesByIdCategoryPerToNbView.usecase";
import UpdateCategoryUseCase from "../../../../core/usecases/category/UpdateCategory.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class CategoryConfig {
    public categoryRepository: CategoryRepository = new CategoryRepositorySQL();
    public userRepository: UserRepository = new UserRepositorySQL();
    public recipeRepository: RecipeRepository = new RecipeRepositorySQL();

    public getAllCategoriesUseCase(): GetAllCategoriesUseCase {
        return new GetAllCategoriesUseCase(this.categoryRepository, this.userRepository);
    }

    public getRecipesByIdCategoryUseCase(): GetRecipesByIdCategoryUseCase {
        return new GetRecipesByIdCategoryUseCase(this.categoryRepository, this.userRepository);
    }

    public getRecipesByIdCategoryPerToNbViewUseCase(): GetRecipesByIdCategoryPerToNbViewUseCase {
        return new GetRecipesByIdCategoryPerToNbViewUseCase(this.categoryRepository, this.userRepository);
    }

    public getCategoriesNotInRecipeUseCase(): GetCategoriesNotInRecipeUseCase {
        return new GetCategoriesNotInRecipeUseCase(this.categoryRepository, this.userRepository, this.recipeRepository);
    }

    public createCategoryUseCase(): CreateCategoryUseCase {
        return new CreateCategoryUseCase(this.categoryRepository, this.userRepository);
      }

    public deleteCategoryUseCase(): DeleteCategoryUseCase {
        return new DeleteCategoryUseCase(this.categoryRepository, this.userRepository);
      }
    
      public updateCategoryUseCase(): UpdateCategoryUseCase {
        return new UpdateCategoryUseCase(this.categoryRepository, this.userRepository);
      }
}