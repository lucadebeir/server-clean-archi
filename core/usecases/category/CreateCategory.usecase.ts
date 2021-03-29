import Category from "../../domain/Category.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { isAdmin } from "../../utils/token.service";

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(category?: Category, user?: TokenDomain): Promise<Category> {
    this.checkBusinessRules(category, user);
    return await this.categoryRepository.create(category);
  }

  private checkBusinessRules(category?: Category, user?: TokenDomain): void {
    if (user && isAdmin(user)) {
      if (category) {
        if (!category.libelleCategorie) {
          throw new BusinessException(
            "Le libellé d'une catégorie est obligatoire"
          );
        } else {
          if (
            this.categoryRepository.checkExistByName(category.libelleCategorie)
          ) {
            throw new BusinessException(
              "Ce libellé est déjà utilisé par une catégorie"
            );
          }
        }
      } else {
        throw new TechnicalException("La catégorie est indéfinie");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
