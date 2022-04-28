import Recipe from "../../domain/Recipe";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {updateDataRecipe} from "../../utils/recipe";
import changeFormatDate from '../../utils/date';

export default class FindRecipeByIdUsecase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  execute = async (id: any): Promise<Recipe> => {
    this.checkBusinessRules(id);
    let result: Recipe = await this.recipeRepository.findById(id);
    result = updateDataRecipe(result);
    result.commentaires.map(commentaire => commentaire.date = changeFormatDate(commentaire));
    return result;
  };

  private checkBusinessRules = (id: any): void => {
    if (id) {
      if (!this.recipeRepository.existById(id))
        throw new BusinessException("Cette recette n'existe pas");
    } else
      throw new TechnicalException("L'identifiant d'une recette est obligatoire");
  };
}
