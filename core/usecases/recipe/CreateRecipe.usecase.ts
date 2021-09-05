import Recipe from "../../domain/Recipe";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import CategoryRepository from "../../ports/repositories/Category.repository";
import IngredientRepository from "../../ports/repositories/Ingredient.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UnityRepository from "../../ports/repositories/Unity.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isAdmin } from "../../utils/token.service";

export default class CreateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private categoryRepository: CategoryRepository,
    private ingredientRepository: IngredientRepository,
    private unityRepository: UnityRepository,
    private mailingRepository: MailingRepository,
    private userRepository: UserRepository //
  ) {} //constructeur avec l'interface

  async execute(recipe?: Recipe, token?: TokenDomain): Promise<Recipe> {
    this.checkBusinessRules(recipe, token);

    const result = await this.recipeRepository
      .create(recipe)
      .then(async (result) => {
        console.log(result);
        this.userRepository.findAllAbonneMailUsers().then((users) => {
          users.map((user) => {
            const data = {
              recipe: result,
              user: user,
            };
            this.mailingRepository.sendMailWhenNewRecipe(data);
          });
        });
        return result;
      });
    return result;
  }

  private checkBusinessRules(recipe?: Recipe, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (recipe) {
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
          recipe.ingredients?.length == 0 ||
          !recipe.ingredients
        ) {
          throw new BusinessException(
            "Il faut sélectionner au moins un ingrédient pour créer une recette"
          );
        } else {
          recipe.ingredients?.map((ingredient) => {
            if (ingredient.quantity && ingredient.quantity <= 0) {
              throw new BusinessException(
                "Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0"
              );
            }

            if (!this.ingredientRepository.existById(ingredient.id_ingredient)) {
              throw new BusinessException(
                "L'ingrédient " + ingredient.id_ingredient + " n'existe pas"
              );
            }

            if (!this.unityRepository.existById(ingredient.id_unit)) {
              throw new BusinessException(
                "L'unité " + ingredient.id_unit + " n'existe pas"
              );
            }
          });
        }

        if (recipe.recipes__categories?.length == 0 || !recipe.recipes__categories) {
          throw new BusinessException(
            "Il faut sélectionner au moins une catégorie pour créer une recette"
          );
        } else {
          recipe.recipes__categories?.map((category) => {
            if (!this.categoryRepository.existById(category.id_category)) {
              throw new BusinessException(
                "La catégorie " + category.id_category + " n'existe pas"
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
