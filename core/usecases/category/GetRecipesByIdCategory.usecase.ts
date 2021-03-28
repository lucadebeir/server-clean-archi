import user from "../../../adaptater/primaries/rest/endpoints/User";
import Recipe from "../../domain/Recipe";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetRecipesByIdCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {} //constructeur avec l'interface

  async execute(id: any, user: User): Promise<Recipe[]> {
    this.checkBusinessRules(id, user);
    return await this.categoryRepository.getRecipesByIdCategory(id);
  }

  private checkBusinessRules(id: any, user: User): void {
    if (this.userRepository.isAdmin(user)) {
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
