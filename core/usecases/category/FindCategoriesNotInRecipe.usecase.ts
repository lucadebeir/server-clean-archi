import Category from "../../domain/Category";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindCategoriesNotInRecipeUsecase {
  constructor(private categoryRepository: CategoryRepository, private recipeRepository: RecipeRepository) {}

  execute = async (id: any, user: Token): Promise<Category[]> => {
    await this.checkBusinessRules(id, user);
    return await this.categoryRepository.findCategoriesNotInRecipe(id);
  };

  private checkBusinessRules = async (id: any, user: Token): Promise<void> => {
    if (isAdmin(user)) {
      if (id) {
        await this.recipeRepository.findById(id).then((recipe) => {
          if (!recipe) throw new BusinessException("Cette recette n'existe pas");
        });
      } else throw new TechnicalException("L'identifiant de la recette est indéfinie");
    } else throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
  };
}
