import Recipe from "../../domain/Recipe";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class GetRecipesByIdCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Recipe[]> {
    return await this.categoryRepository.getRecipesByIdCategory(id);
  }
}