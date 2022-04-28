import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindRestOfIngredientsPerToListUsecase {
  constructor(private ingredientRepository: IngredientRepository) {} //constructeur avec l'interface

  execute = async (idIngredients: any, user?: Token): Promise<Ingredient[]> => {
    this.checkBusinessRules(idIngredients, user);
    const ingredients: Ingredient[] = await this.ingredientRepository.findRestOfIngredientsPerToList(idIngredients);
    ingredients.sort((a, b) => {
      if(a.name && b.name) return a.name.localeCompare(b.name);
      return 0;
    });
    return ingredients;
  };

  private checkBusinessRules = (ingredients: any, user?: Token): void => {
    if (user && isAdmin(user)) {
      if (!ingredients) throw new BusinessException("Une liste d'ingrédients ne peut pas être nulle");
    } else throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
  };
}
