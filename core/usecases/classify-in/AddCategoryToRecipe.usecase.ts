import ClassifyIn from "../../domain/ClassifyIn";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";

export default class AddCategoryToRecipeUseCase {
    constructor(private classifyInRepository: ClassifyInRepository) {}

    async execute(classify: ClassifyIn): Promise<string> {
        return this.classifyInRepository.addCategoryToRecipe(classify);
    }
}