import Category from "../../domain/Category.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { isAdmin } from "../../utils/token.service";

export default class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(user?: TokenDomain, category?: Category): Promise<Category> {
    this.checkBusinessRules(user, category);
    return await this.categoryRepository.update(category);
  }

  private checkBusinessRules(user?: TokenDomain, category?: Category): void {
    if (user && isAdmin(user)) {
      if (category) {
        if (!category.idCategorie) {
          throw new TechnicalException(
            "L'identifiant d'une catégorie est obligatoire pour pouvoir la modifier"
          );
        }
        if (this.categoryRepository.existById(category.idCategorie)) {
          if (!category.libelleCategorie) {
            throw new BusinessException(
              "Le libellé d'une catégorie est obligatoire"
            );
          } else {
            if (
              this.categoryRepository.checkExistByName(
                category.libelleCategorie
              )
            ) {
              throw new BusinessException(
                "Ce libellé est déjà utilisé par une catégorie"
              );
            }
          }
        } else {
          throw new BusinessException("Cette catégorie n'existe pas");
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
