import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateIngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  execute = async (ingredient?: Ingredient, user?: Token): Promise<Ingredient> => {
    await this.checkBusinessRules(ingredient, user);
    return await this.ingredientRepository.update(ingredient);
  };

  private checkBusinessRules = async (ingredient?: Ingredient, user?: Token): Promise<void> => {
    if (user && isAdmin(user)) {
      if (ingredient) {
        if (!ingredient.id) {
          throw new TechnicalException("L'identifiant d'un ingrédient est obligatoire pour pouvoir le modifier");
        } else {
          if (await this.ingredientRepository.findById(ingredient.id)) {
            if (!ingredient.name) {
              throw new BusinessException("Le nom d'un ingrédient est obligatoire");
            } else {
              if (ingredient.name.length > 39) {
                throw new BusinessException("Le nom d'un ingrédient ne peut pas comporter plus de 39 caractères");
              }
            }
          } else {
            throw new BusinessException("Cet ingrédient n'existe pas");
          }
        }
      } else {
        throw new TechnicalException("L'ingrédient est indéfinie");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
