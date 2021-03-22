import ClassifyInRepository from "../../../../core/ports/repositories/ClassifyIn.repository";
import AddCategoryToRecipeUseCase from "../../../../core/usecases/classify-in/AddCategoryToRecipe.usecase";
import DeleteCategoryFromRecipeUseCase from "../../../../core/usecases/classify-in/DeleteCategoryFromRecipe.usecase";
import ClassifyInRepositorySQL from "../../../secondaries/mysql/repositories/ClassifyInRepositorySQL";

export default class ClassifyInConfig {
    public classifyInRepository: ClassifyInRepository = new ClassifyInRepositorySQL();

    public addCategoryToRecipeUseCase(): AddCategoryToRecipeUseCase {
        return new AddCategoryToRecipeUseCase(this.classifyInRepository);
    }

    public deleteCategoryFromRecipeUseCase(): DeleteCategoryFromRecipeUseCase {
        return new DeleteCategoryFromRecipeUseCase(this.classifyInRepository);
    }
}