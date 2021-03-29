import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import { isAdmin } from "../../utils/token.service";

export default class DeleteIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async execute(id: any, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(id, token);
    return await this.ingredientRepository.deleteById(id);
  }

  private checkBusinessRules(id: any, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (id) {
        if (this.ingredientRepository.existById(id)) {
          if (this.ingredientRepository.checkExistInRecipes(id)) {
            throw new BusinessException(
              "Cet ingrédient est associé à une ou plusieurs recettes"
            );
          }
        } else {
          throw new BusinessException("Cet ingrédient n'existe pas");
        }
      } else {
        throw new TechnicalException(
          "L'identifiant d'un ingrédient est indéfini"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
