import Category from "../../domain/Category";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import {isAdmin} from "../../utils/token.service";

export default class CreateCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(category?: Category, user?: Token): Promise<Category> {
        await this.checkBusinessRules(category, user);
        return await this.categoryRepository.create(category);
    }

    private async checkBusinessRules(category?: Category, user?: Token): Promise<void> {
        if (user && isAdmin(user)) {
            if (category) {
                if (!category.name) {
                    throw new BusinessException("Le libellé d'une catégorie est obligatoire");
                } else {
                    if (await this.categoryRepository.checkExistByName(category.name)) {
                        throw new BusinessException("Ce libellé est déjà utilisé par une catégorie");
                    }
                }
            } else {
                throw new TechnicalException("La catégorie est indéfinie");
            }
        } else {
            throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
        }
    }
}
