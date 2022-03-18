import ClassifyIn from "../../domain/ClassifyIn";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class DeleteCategoryFromRecipeUseCase {
    constructor(private classifyInRepository: ClassifyInRepository, private categoryRepository: CategoryRepository,
        private recipeRepository: RecipeRepository) {}

    async execute(classify: ClassifyIn, token?: Token): Promise<string> {
        this.checkBusinessRules(classify, token);
        return this.classifyInRepository.deleteCategoryFromRecipe(classify);
    }

    private checkBusinessRules(classify: ClassifyIn, token?: Token): void {
        if (token && isAdmin(token)) {
          if (classify) {
            if (
              !classify.id_category ||
              !this.categoryRepository.existById(classify.id_category)
            ) {
              throw new BusinessException("La catégorie doit exister");
            }
            if (
              !classify.id_recipe ||
              !this.recipeRepository.existById(classify.id_recipe)
            ) {
              throw new BusinessException("La recette doit exister");
            }
            if (!this.classifyInRepository.check(classify)) {
              throw new BusinessException(
                "L'association de la recette et de la catégorie n'existe pas"
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
