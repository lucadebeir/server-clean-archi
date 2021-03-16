import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import GetAllCategoriesUseCase from "../../../../core/usecases/category/GetAllCategories.usecase";
import GetRecipesByIdCategoryUseCase from "../../../../core/usecases/category/GetRecipesByIdCategory.usecase";
import GetRecipesByIdCategoryPerToNbViewUseCase from "../../../../core/usecases/category/GetRecipesByIdCategoryPerToNbView.usecase";
import CategoryRepositorySQL from "../../../secondaries/mysql/repositories/CategoryRepositorySQL";

export default class CategoryConfig {
    public categoryRepository: CategoryRepository = new CategoryRepositorySQL();

    public getAllCategoriesUseCase(): GetAllCategoriesUseCase {
        return new GetAllCategoriesUseCase(this.categoryRepository);
    }

    public getRecipesByIdCategoryUseCase(): GetRecipesByIdCategoryUseCase {
        return new GetRecipesByIdCategoryUseCase(this.categoryRepository);
    }

    public getRecipesByIdCategoryPerToNbViewUseCase(): GetRecipesByIdCategoryPerToNbViewUseCase {
        return new GetRecipesByIdCategoryPerToNbViewUseCase(this.categoryRepository);
    }
}