import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import { isAdmin } from "../../utils/token.service";

export default class CreateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private categoryRepository: CategoryRepository,
    private ingredientRepository: IngredientRepository,
    private unityRepository: UnityRepository
  ) {} //constructeur avec l'interface

  async execute(recipe?: Recipe, token?: TokenDomain): Promise<Recipe> {
    this.checkBusinessRules(recipe, token);
    return await this.recipeRepository.create(recipe);
  }

  private checkBusinessRules(recipe?: Recipe, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (recipe) {
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
          recipe.utiliserIngredients?.map((ingredient) => {
            if (ingredient.qte && ingredient.qte <= 0) {
              throw new BusinessException(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
              );
            }

            if (!this.ingredientRepository.existById(ingredient.idIngredient)) {
              throw new BusinessException(
                "L'ingrédient " + ingredient.idIngredient + " n'existe pas"
              );
            }

            if (!this.unityRepository.existById(ingredient.idUnite)) {
              throw new BusinessException(
                "L'unité " + ingredient.idUnite + " n'existe pas"
              );
            }
          });
        }

        if (recipe.classerDans?.length == 0 || !recipe.classerDans) {
          throw new BusinessException(
            "Il faut sélectionner au moins une catégorie pour créer une recette"
          );
        } else {
          recipe.classerDans?.map((category) => {
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
          "Un objet de type Recette est requis pour créer une recette"
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
