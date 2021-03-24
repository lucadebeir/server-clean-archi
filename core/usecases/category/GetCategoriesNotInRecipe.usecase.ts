import Category from "../../domain/Category.domain";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class GetCategoriesNotInRecipeUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: any): Promise<Category[]> {
        return await this.categoryRepository.findCategoriesNotInRecipe(id);
    }
}