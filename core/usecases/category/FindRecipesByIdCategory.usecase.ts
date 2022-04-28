import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindRecipesByIdCategoryUsecase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  execute = async (id: any, user: Token): Promise<Recipe[]> => {
    await this.checkBusinessRules(id, user);
    return await this.categoryRepository.getRecipesByIdCategory(id);
  };

  private checkBusinessRules = async (id: any, user: Token): Promise<void> => {
    if (isAdmin(user)) {
      if (id) {
        if (!await this.categoryRepository.existById(id)) throw new BusinessException("Cette catégorie n'existe pas");
      } else throw new TechnicalException("L'identifiant de la catégorie est indéfinie");
    } else throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
  };
}
