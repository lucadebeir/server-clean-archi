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

    execute = async (classify: ClassifyIn, token?: Token): Promise<string> => {
        await this.checkBusinessRules(classify, token);
        return this.classifyInRepository.deleteCategoryFromRecipe(classify);
    };

    private checkBusinessRules = async (classify: ClassifyIn, token?: Token): Promise<void> => {
        if (token && isAdmin(token)) {
            if (classify) {
                if (!classify.id_category || !await this.categoryRepository.existById(classify.id_category)) {
                    throw new BusinessException("La catégorie doit exister");
                }
                if (!classify.id_recipe || !await this.recipeRepository.existById(classify.id_recipe)) {
                    throw new BusinessException("La recette doit exister");
                }
                if (!await this.classifyInRepository.check(classify)) {
                    throw new BusinessException("L'association de la recette et de la catégorie n'existe pas");
                }
            } else {
                throw new TechnicalException("Problème technique");
            }
        } else {
            throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
        }
    };
}
