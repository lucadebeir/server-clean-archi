import Category from "../../domain/Category";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class FindAllCategoriesUsecase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  execute = async (): Promise<Category[]> => await this.categoryRepository.findAll();
}
