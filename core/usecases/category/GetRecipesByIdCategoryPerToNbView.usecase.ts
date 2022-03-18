import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import {isAdmin} from "../../utils/token.service";

export default class GetRecipesByIdCategoryPerToNbViewUseCase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  async execute(id: any, user: Token): Promise<Recipe[]> {
    this.checkBusinessRules(id, user);
    return await this.categoryRepository.getRecipesByIdCategoryPerToNbView(id);
  }

  private checkBusinessRules(id: any, user: Token): void {
    if (isAdmin(user)) {
      if (id) {
        if (!this.categoryRepository.existById(id)) {
          throw new BusinessException("Cette catégorie n'existe pas");
        }
      } else {
        throw new TechnicalException(
          "L'identifiant de la catégorie est indéfinie"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
