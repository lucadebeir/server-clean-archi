import RecipeList from "../../domain/RecipeList";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class UpdateStateByIdUseCase {
  constructor(private recipeListRepository: RecipeListRepository, private userRepository: UserRepository) {}

  execute = async (recipe: RecipeList, token?: Token): Promise<string> => {
    await this.checkBusinessRules(recipe, token);
    return await this.recipeListRepository.updateState(recipe);
  };

  private checkBusinessRules = async (recipe: RecipeList, token?: Token): Promise<void> => {
    if (!token || !isLogin(token)) {
      throw new TechnicalException("Vous n'avez pas le droit de modifier cette ressource");
    } else {
      if (recipe) {
        if (recipe.pseudo) {
          if (!await this.userRepository.existByPseudo(recipe.pseudo)) {
            throw new BusinessException("L'utilisateur n'existe pas");
          }
          if (token.pseudo !== recipe.pseudo) {
            throw new TechnicalException("Problème technique");
          }
        } else {
          throw new BusinessException("Le pseudo d'un utilisateur est obligatoire");
        }
      } else {
        throw new BusinessException("La recette à modifier est obligatoire");
      }
    }
  };
}
