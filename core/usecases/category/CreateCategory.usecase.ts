import Category from "../../domain/Category";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(category?: Category): Promise<Category> {
    this.checkBusinessRules(category);
    return await this.categoryRepository.create(category);
  }

  private checkBusinessRules(category?: Category): void {
    if (category) {
      if (!category.libelleCategorie) {
        throw new BusinessException(
          "Le libellé d'une catégorie est obligatoire"
        );
      }
    } else {
      throw new TechnicalException("La catégorie est indéfinie");
    }
  }
}
