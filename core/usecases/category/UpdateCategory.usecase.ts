import Category from "../../domain/Category";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute = async (user?: Token, category?: Category): Promise<Category> => {
    await this.checkBusinessRules(user, category);
    return await this.categoryRepository.update(category);
  };

  private checkBusinessRules = async (user?: Token, category?: Category): Promise<void> => {
    if (user && isAdmin(user)) {
      if (category) {
        if (!category.id) {
          throw new TechnicalException("L'identifiant d'une catégorie est obligatoire pour pouvoir la modifier");
        }
        if (await this.categoryRepository.existById(category.id)) {
          if (!category.name) {
            throw new BusinessException("Le libellé d'une catégorie est obligatoire");
          } else {
            if (await this.categoryRepository.checkExistByName(category.name)) {
              throw new BusinessException("Ce libellé est déjà utilisé par une catégorie");
            }
          }
        } else {
          throw new BusinessException("Cette catégorie n'existe pas");
        }
      } else {
        throw new TechnicalException("La catégorie est indéfinie");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
