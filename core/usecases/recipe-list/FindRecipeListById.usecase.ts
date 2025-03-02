import RecipeList from "../../domain/RecipeList";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class FindRecipeListByIdUsecase {
  constructor(private recipeListRepository: RecipeListRepository, private userRepository: UserRepository) {}

  execute = async (pseudo: any, token?: Token): Promise<RecipeList[]> => {
    await this.checkBusinessRules(pseudo, token);
    return await this.recipeListRepository.findById(pseudo);
  };

  private checkBusinessRules = async (pseudo: any, token?: Token): Promise<void> => {
    if (!token || !isLogin(token)) {
      throw new TechnicalException("Vous n'avez pas le droit d'accéder à ces ressources");
    } else {
      if (pseudo) {
        if (!await this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
        if (token.pseudo !== pseudo && pseudo !== process.env.PSEUDO_MARINE) {
          throw new TechnicalException("Problème technique");
        }
      } else {
        throw new BusinessException("Le pseudo d'un utilisateur est obligatoire");
      }
    }
  };
}
