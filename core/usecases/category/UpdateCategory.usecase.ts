import Category from "../../domain/Category";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class UpdateCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) {}
  
    async execute(category: Category): Promise<Category> {
      return await this.categoryRepository.update(category);
    }
  }