import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { isAdmin } from "../../utils/token.service";

export default class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: any, user: TokenDomain): Promise<string> {
    this.checkBusinessRules(id, user);
    return await this.categoryRepository.deleteById(id);
  }

  private checkBusinessRules(id: any, user: TokenDomain): void {
    if (isAdmin(user)) {
      if (id) {
        if (this.categoryRepository.existById(id)) {
          if (this.categoryRepository.checkExistInRecipes(id)) {
            throw new BusinessException(
              "Cette catégorie est associée à une ou plusieurs recettes"
            );
          }
        } else {
          throw new BusinessException("Cette catégorie n'existe pas");
        }
      } else {
        throw new TechnicalException(
          "L'identifiant d'une catégorie est indéfini"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
