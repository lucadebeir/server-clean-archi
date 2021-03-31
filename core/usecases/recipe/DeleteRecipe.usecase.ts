import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { isAdmin } from "../../utils/token.service";

export default class DeleteRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {} //constructeur avec l'interface

  async execute(id: any, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(id, token);
    return await this.recipeRepository.deleteById(id);
  }

  private checkBusinessRules(id: any, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (id) {
        if (this.recipeRepository.existById(id)) {
          if (this.recipeRepository.useInMenu(id)) {
            throw new BusinessException(
              "La recette " +
                id +
                " ne peut pas être supprimée car cette dernière est utilisée par le menu."
            );
          }
          if (this.recipeRepository.useInRecipeList(id)) {
            throw new BusinessException(
              "La recette " +
                id +
                " ne peut pas être supprimée car cette dernière est utilisée par un menu de la semaine."
            );
          }
        } else {
          throw new BusinessException("Cette recette n'existe pas");
        }
      } else {
        throw new TechnicalException(
          "L'identifiant d'une recette est indéfini"
        );
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
