import Category from "../../domain/Category.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetAllCategoriesUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {} //constructeur avec l'interface

  async execute(user: User): Promise<Category[]> {
    this.checkBusinessRules(user);
    return await this.categoryRepository.findAll();
  }

  private checkBusinessRules(user: User): void {
    if (!this.userRepository.isAdmin(user)) {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
