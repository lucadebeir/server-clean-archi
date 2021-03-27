import Category from "../../domain/Category.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {}

  async execute(user?: User, category?: Category): Promise<Category> {
    this.checkBusinessRules(user, category);
    return await this.categoryRepository.update(category);
  }

  private checkBusinessRules(user?: User, category?: Category): void {
    if (user && this.userRepository.isAdmin(user)) {
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
