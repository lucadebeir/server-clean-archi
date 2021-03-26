import Category from "../../domain/Category.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: any): Promise<string> {
    this.checkBusinessRules(id);
    return await this.categoryRepository.deleteById(id);
  }

  private checkBusinessRules(id?: any): void {
    if (id) {
      if (this.categoryRepository.checkExistInRecipes(id)) {
        throw new BusinessException(
          "Cette catégorie est associée à une ou plusieurs recettes"
        );
      }
    } else {
      throw new TechnicalException(
        "L'identifiant d'une catégorie est indéfinie"
      );
    }
  }
}
