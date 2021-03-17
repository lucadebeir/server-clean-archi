import CategoryRepository from "../../ports/repositories/Category.repository";

export default class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: any): Promise<string> {
    return await this.categoryRepository.deleteById(id);
  }
}