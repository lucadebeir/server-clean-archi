import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class DeleteCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {}

  async execute(id: any, user: User): Promise<string> {
    this.checkBusinessRules(id, user);
    return await this.categoryRepository.deleteById(id);
  }

  private checkBusinessRules(id: any, user: User): void {
    if (this.userRepository.isAdmin(user)) {
      if (id) {
        if (this.categoryRepository.checkExistInRecipes(id)) {
          throw new BusinessException(
            "Cette catégorie est associée à une ou plusieurs recettes"
          );
        }
      } else {
        throw new TechnicalException(
          "L'identifiant d'une catégorie est indéfinie"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
