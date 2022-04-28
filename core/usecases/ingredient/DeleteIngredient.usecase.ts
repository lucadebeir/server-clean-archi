import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class DeleteIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  execute = async (id: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(id, token);
    return await this.ingredientRepository.deleteById(id);
  };

  private checkBusinessRules = async (id: any, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (id) {
        if (await this.ingredientRepository.existById(id)) {
          if (await this.ingredientRepository.checkExistInRecipes(id)) {
            throw new BusinessException("Cet ingrédient est associé à une ou plusieurs recettes");
          }
        } else {
          throw new BusinessException("Cet ingrédient n'existe pas");
        }
      } else {
        throw new TechnicalException("L'identifiant d'un ingrédient est indéfini");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
