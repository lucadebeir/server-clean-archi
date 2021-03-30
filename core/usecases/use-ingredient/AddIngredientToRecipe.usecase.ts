import TokenDomain from "../../domain/Token.domain";
import UseIngredient from "../../domain/UseIngredient";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import { isAdmin } from "../../utils/token.service";

export default class AddIngredientToRecipeUseCase {
  constructor(
    private useIngredientRepository: UseIngredientRepository,
    private unityRepository: UnityRepository,
    private ingredientRepository: IngredientRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    useIngredient: UseIngredient,
    token?: TokenDomain
  ): Promise<string> {
    this.checkBusinessRules(useIngredient, token);
    return this.useIngredientRepository.addIngredientToRecipe(useIngredient);
  }

  private checkBusinessRules(
    useIngredient?: UseIngredient,
    token?: TokenDomain
  ): void {
    if (token && isAdmin(token)) {
      if (useIngredient) {
        if (
          !useIngredient.idUnite ||
          !this.unityRepository.findById(useIngredient.idUnite)
        ) {
          throw new BusinessException("L'unité doit exister");
        }
        if (
          !useIngredient.idIngredient ||
          !this.ingredientRepository.findById(useIngredient.idIngredient)
        ) {
          throw new BusinessException("L'ingrédient doit exister");
        }
        if (
          !useIngredient.idRecette ||
          !this.recipeRepository.findById(useIngredient.idRecette)
        ) {
          throw new BusinessException("La recette doit exister");
        }
        if (useIngredient.qte == 0) {
          throw new BusinessException(
            "Une quantité ne peut pas être négative, ni nulle"
          );
        }
        if (!useIngredient.qte) {
          throw new BusinessException("La quantité est obligatoire");
        }
        if (this.useIngredientRepository.check(useIngredient)) {
          throw new BusinessException(
            "Cet ingrédient existe déjà dans cette recette"
          );
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
