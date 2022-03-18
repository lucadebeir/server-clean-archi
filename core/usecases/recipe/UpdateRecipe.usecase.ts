import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private categoryRepository: CategoryRepository,
    private ingredientRepository: IngredientRepository,
    private unityRepository: UnityRepository
  ) {} //constructeur avec l'interface

  async execute(recipe: Recipe, token?: Token): Promise<Recipe> {
    this.checkBusinessRules(recipe, token);
    return await this.recipeRepository.update(recipe);
  }

  private checkBusinessRules(recipe?: Recipe, token?: Token): void {
    if (token && isAdmin(token)) {
      if (recipe?.id) {
        this.checkIfValueIsEmpty(recipe.name, "nomRecette");
        this.checkIfValueIsEmpty(recipe.name_portion, "libellePart");
        this.checkIfValueIsEmpty(recipe.number_portion, "nbrePart");
        this.checkIfValueIsEmpty(recipe.preparation_time, "tempsPreparation");

        this.checkIfValueIsValid(60, recipe.name, "nomRecette");
        this.checkIfValueIsValid(50, recipe.name_portion, "libellePart");

        if (recipe.number_portion && recipe.number_portion <= 0) {
          throw new BusinessException(
            "Le nombre de part doit être strictement supérieur à 0"
          );
        }

        if (
          recipe.recipes__ingredients__units?.length == 0 ||
          !recipe.recipes__ingredients__units
        ) {
          throw new BusinessException(
            "Il faut sélectionner au moins un ingrédient pour créer une recette"
          );
        } else {
          recipe.recipes__ingredients__units?.map((useIngredient) => {
            if (useIngredient.quantity && useIngredient.quantity <= 0) {
              throw new BusinessException(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
              );
            }

            if (
              !this.ingredientRepository.existById(
                useIngredient.ingredient?.id
              )
            ) {
              throw new BusinessException(
                "L'ingrédient " +
                  useIngredient.ingredient?.id +
                  " n'existe pas"
              );
            }

            if (!this.unityRepository.existById(useIngredient.unite?.id)) {
              throw new BusinessException(
                "L'unité " + useIngredient.unite?.id + " n'existe pas"
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
            if (!this.categoryRepository.existById(category.id)) {
              throw new BusinessException(
                "La catégorie " + category.id + " n'existe pas"
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
