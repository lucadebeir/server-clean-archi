import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isLogin} from "../../utils/token.service";

export default class FindAllIngredientsUsecase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  execute = async (token?: Token): Promise<Ingredient[]> => {
    this.checkBusinessRules(token);
    const ingredients: Ingredient[] = await this.ingredientRepository.findAll();
    ingredients.sort((a, b) => {
      if(a.name && b.name) return a.name.localeCompare(b.name);
      return 0;
    });
    return ingredients;
  };

  private checkBusinessRules = (token?: Token): void => {
    if (!token || !isLogin(token)) {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
