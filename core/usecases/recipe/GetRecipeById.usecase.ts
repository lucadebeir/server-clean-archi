import Recipe from "../../domain/Recipe";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";

export default class GetRecipeByIdUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any): Promise<Recipe> {
    this.checkBusinessRules(id);
    return await this.recipeRepository.findById(id);
  }

  private checkBusinessRules(id: any): void {
    if (id) {
      if (!this.recipeRepository.existById(id)) {
        throw new BusinessException("Cette recette n'existe pas");
      }
    } else {
      throw new TechnicalException(
        "L'identifiant d'une recette est obligatoire"
      );
    }
  }
}
