import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindIngredientsNotInRecipeUsecase {
  constructor(private ingredientRepository: IngredientRepository, private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (id: any, user?: Token): Promise<Ingredient[]> => {
    await this.checkBusinessRules(id, user);
    const ingredients: Ingredient[] = await this.ingredientRepository.findIngredientsNotInRecipe(id);
    ingredients.sort((a, b) => {
      if(a.name && b.name) return a.name.localeCompare(b.name);
      return 0;
    });
    return ingredients;
  };

  private checkBusinessRules = async (id: any, user?: Token): Promise<void> => {
    if (user && isAdmin(user)) {
      if (!id) throw new BusinessException("L'identifiant d'une recette est obligatoire");
      else {
        if (!await this.recipeRepository.existById(id)) throw new BusinessException("L'identifiant " + id + " ne correspond à aucune ressource existante.");
      }
    } else throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
  };
}
