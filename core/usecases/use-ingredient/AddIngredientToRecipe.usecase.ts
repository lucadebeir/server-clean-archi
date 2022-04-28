import Token from "../../domain/Token";
import UseIngredient from "../../domain/UseIngredient";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import {isAdmin} from "../../utils/token.service";

export default class AddIngredientToRecipeUseCase {
  constructor(private useIngredientRepository: UseIngredientRepository, private unityRepository: UnityRepository,
    private ingredientRepository: IngredientRepository, private recipeRepository: RecipeRepository) {}

  execute = async (useIngredient: UseIngredient, token?: Token): Promise<string> => {
    await this.checkBusinessRules(useIngredient, token);
    return this.useIngredientRepository.addIngredientToRecipe(useIngredient);
  };

  private checkBusinessRules = async (useIngredient?: UseIngredient, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (useIngredient) {
        if (!useIngredient.id_unit || !await this.unityRepository.findById(useIngredient.id_unit)) {
          throw new BusinessException("L'unité doit exister");
        }
        if (!useIngredient.id_ingredient || !await this.ingredientRepository.findById(useIngredient.id_ingredient)) {
          throw new BusinessException("L'ingrédient doit exister");
        }
        if (!useIngredient.id_recipe || !await this.recipeRepository.findById(useIngredient.id_recipe)) {
          throw new BusinessException("La recette doit exister");
        }
        if (useIngredient.quantity == 0) {
          throw new BusinessException("Une quantité ne peut pas être négative, ni nulle");
        }
        if (!useIngredient.quantity) {
          throw new BusinessException("La quantité est obligatoire");
        }
        if (await this.useIngredientRepository.check(useIngredient)) {
          throw new BusinessException("Cet ingrédient existe déjà dans cette recette");
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
