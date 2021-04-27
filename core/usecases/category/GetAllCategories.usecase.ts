import Category from "../../domain/Category.domain";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }
}
