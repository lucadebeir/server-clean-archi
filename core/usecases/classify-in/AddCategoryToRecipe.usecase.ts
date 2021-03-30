import ClassifyIn from "../../domain/ClassifyIn";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { isAdmin } from "../../utils/token.service";

export default class AddCategoryToRecipeUseCase {
  constructor(
    private classifyInRepository: ClassifyInRepository,
    private categoryRepository: CategoryRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(classify: ClassifyIn, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(classify, token);
    return this.classifyInRepository.addCategoryToRecipe(classify);
  }

  private checkBusinessRules(classify: ClassifyIn, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (classify) {
        if (
          !classify.idCategorie ||
          !this.categoryRepository.existById(classify.idCategorie)
        ) {
          throw new BusinessException("La catégorie doit exister");
        }
        if (
          !classify.idRecette ||
          !this.recipeRepository.findById(classify.idRecette)
        ) {
          throw new BusinessException("La recette doit exister");
        }
        if (this.classifyInRepository.check(classify)) {
          throw new BusinessException(
            "Cette catégorie existe déjà dans cette recette"
          );
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
