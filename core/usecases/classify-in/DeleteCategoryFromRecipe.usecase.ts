import ClassifyIn from "../../domain/ClassifyIn";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";

export default class DeleteCategoryFromRecipeUseCase {
    constructor(private classifyInRepository: ClassifyInRepository) {}

    async execute(classify: ClassifyIn): Promise<string> {
        return this.classifyInRepository.deleteCategoryFromRecipe(classify);
    }
}