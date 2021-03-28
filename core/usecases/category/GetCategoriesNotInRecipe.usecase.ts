import Category from "../../domain/Category.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetCategoriesNotInRecipeUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(id: any, user: User): Promise<Category[]> {
    this.checkBusinessRules(id, user);
    return await this.categoryRepository.findCategoriesNotInRecipe(id);
  }

  private checkBusinessRules(id: any, user: User): void {
    if (this.userRepository.isAdmin(user)) {
      if (id) {
        this.recipeRepository.findById(id).then((recipe) => {
          if (!recipe) {
            throw new BusinessException("Cette recette n'existe pas");
          }
        });
      } else {
        throw new TechnicalException(
          "L'identifiant de la recette est indéfinie"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
