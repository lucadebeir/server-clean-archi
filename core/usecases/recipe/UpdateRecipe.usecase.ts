import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";
import ClassifyInRepository from "../../ports/repositories/ClassifyIn.repository";
import UseIngredientRepository from "../../ports/repositories/UseIngredient.repository";
import StepRepository from "../../ports/repositories/Step.repository";

export default class UpdateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private classifyInRepository: ClassifyInRepository,
    private useIngredientRepository: UseIngredientRepository,
    private stepRepository: StepRepository
  ) {} //constructeur avec l'interface

  execute = async (recipe: Recipe, token: Token): Promise<Recipe> => {
    this.checkBusinessRules(recipe, token);
    await this.updateAssociations(recipe);
    return await this.recipeRepository.update(recipe);
  };

  private updateAssociations = async (recipe: Recipe): Promise<void> => {
    if (recipe.recipes__categories) for (const category of recipe.recipes__categories) {
      category.id_recipe = recipe.id;
      if (!await this.classifyInRepository.check(category)) {
        await this.classifyInRepository.addCategoryToRecipe(category);
      }
    }

    if(recipe.recipes__ingredients__units) {
      for (const ingredient of recipe.recipes__ingredients__units) {
        ingredient.id_recipe = recipe.id;
        if (await this.useIngredientRepository.check(ingredient)) {
          await this.useIngredientRepository.update(ingredient);
        } else {
          await this.useIngredientRepository.addIngredientToRecipe(ingredient);
        }
      }
    }

    if(recipe.steps) for(const step of recipe.steps) {
      step.id_recipe = recipe.id;
      if(await this.stepRepository.check(step)) {
        await this.stepRepository.update(step);
      } else {
        await this.stepRepository.addStepToRecipe(step);
      }
    }
  };

  private checkBusinessRules = (recipe: Recipe, token: Token): void => {
    if (token && isAdmin(token)) {
      if (recipe.id) {
        this.checkIfValueIsEmpty(recipe.name, "name");
        this.checkIfValueIsEmpty(recipe.name_portion, "name_portion");
        this.checkIfValueIsEmpty(recipe.number_portion, "number_portion");
        this.checkIfValueIsEmpty(recipe.preparation_time, "preparation_time");
        this.checkIfValueIsValid(60, recipe.name, "name");
        this.checkIfValueIsValid(50, recipe.name_portion, "name_portion");

        if (recipe.number_portion && recipe.number_portion <= 0) {
          throw new BusinessException("Le nombre de part doit être strictement supérieur à 0");
        }

        if (recipe.recipes__ingredients__units?.length == 0 || !recipe.recipes__ingredients__units) {
          throw new BusinessException("Il faut sélectionner au moins un ingrédient pour créer une recette");
        } else {
          recipe.recipes__ingredients__units?.map((useIngredient) => {
            if (useIngredient.quantity && useIngredient.quantity <= 0) {
              throw new BusinessException("Les quantités au niveau des ingrédients utilisés doivent être strictement supérieurs à 0");
            }
          });
        }

        if (recipe.recipes__categories?.length == 0 || !recipe.recipes__categories) {
          throw new BusinessException("Il faut sélectionner au moins une catégorie pour créer une recette");
        }

        if (recipe.recipes__images?.length == 0 || !recipe.recipes__images) {
          throw new BusinessException("Il faut sélectionner au moins une image pour créer une recette");
        }
      } else {
        throw new TechnicalException("Un identifiant est requis pour modifier une recette");
      }
    } else {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };

  private checkIfValueIsEmpty = (value: any, champ?: string): void => {
    if (!value && value != 0) {
      throw new BusinessException("Le champ " + champ + " d'une recette est obligatoire");
    }
  };

  private checkIfValueIsValid = (chiffre: number, valueS?: string, champ?: string): void => {
    if (valueS && valueS.length > chiffre) {
      throw new BusinessException("Le champ " + champ + " d'une recette ne doit pas dépasser " + chiffre + " caractères");
    }
  };
}
