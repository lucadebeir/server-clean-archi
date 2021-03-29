import Category from "../../domain/Category.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {} //constructeur avec l'interface

  async execute(token: TokenDomain): Promise<Category[]> {
    this.checkBusinessRules(token);
    return await this.categoryRepository.findAll();
  }

  private checkBusinessRules(token: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
