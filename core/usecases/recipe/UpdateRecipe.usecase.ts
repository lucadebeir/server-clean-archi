import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class UpdateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private categoryRepository: CategoryRepository,
    private ingredientRepository: IngredientRepository,
    private unityRepository: UnityRepository
  ) {} //constructeur avec l'interface

  async execute(recipe: Recipe, token?: TokenDomain): Promise<Recipe> {
    this.checkBusinessRules(recipe, token);
    return await this.recipeRepository.update(recipe);
  }

  private checkBusinessRules(recipe?: Recipe, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (recipe?.idRecette) {
        this.checkIfValueIsEmpty(recipe.nomRecette, "nomRecette");
        this.checkIfValueIsEmpty(recipe.libellePart, "libellePart");
        this.checkIfValueIsEmpty(recipe.nbrePart, "nbrePart");
        this.checkIfValueIsEmpty(recipe.tempsPreparation, "tempsPreparation");

        this.checkIfValueIsValid(60, recipe.nomRecette, "nomRecette");
        this.checkIfValueIsValid(50, recipe.libellePart, "libellePart");

        if (recipe.nbrePart && recipe.nbrePart <= 0) {
          throw new BusinessException(
            "Le nombre de part doit être strictement supérieur à 0"
          );
        }

        if (
          recipe.utiliserIngredients?.length == 0 ||
          !recipe.utiliserIngredients
        ) {
          throw new BusinessException(
            "Il faut sélectionner au moins un ingrédient pour créer une recette"
          );
        } else {
          recipe.utiliserIngredients?.map((useIngredient) => {
            if (useIngredient.qte && useIngredient.qte <= 0) {
              throw new BusinessException(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
              );
            }

            if (
              !this.ingredientRepository.existById(
                useIngredient.ingredient?.idIngredient
              )
            ) {
              throw new BusinessException(
                "L'ingrédient " +
                  useIngredient.ingredient?.idIngredient +
                  " n'existe pas"
              );
            }

            if (!this.unityRepository.existById(useIngredient.unite?.idUnite)) {
              throw new BusinessException(
                "L'unité " + useIngredient.unite?.idUnite + " n'existe pas"
              );
            }
          });
        }

        if (recipe.categories?.length == 0 || !recipe.categories) {
          throw new BusinessException(
            "Il faut sélectionner au moins une catégorie pour créer une recette"
          );
        } else {
          recipe.categories?.map((category) => {
            if (!this.categoryRepository.existById(category.idCategorie)) {
              throw new BusinessException(
                "La catégorie " + category.idCategorie + " n'existe pas"
              );
            }
          });
        }

        if (recipe.images?.length == 0 || !recipe.images) {
          throw new BusinessException(
            "Il faut sélectionner au moins une image pour créer une recette"
          );
        }
      } else {
        throw new TechnicalException(
          "Un identifiant est requis pour modifier une recette"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }

  private checkIfValueIsEmpty(value: any, champ?: string): void {
    if (!value && value != 0) {
      throw new BusinessException(
        "Le champ " + champ + " d'une recette est obligatoire"
      );
    }
  }

  private checkIfValueIsValid(
    chiffre: number,
    valueS?: string,
    champ?: string
  ): void {
    if (valueS && valueS.length > chiffre) {
      throw new BusinessException(
        "Le champ " +
          champ +
          " d'une recette ne doit pas dépasser " +
          chiffre +
          " caractères"
      );
    }
  }
}
