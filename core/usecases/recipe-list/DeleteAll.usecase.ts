import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class DeleteAllUseCase {
  constructor(
    private recipeListRepository: RecipeListRepository,
    private userRepository: UserRepository
  ) {}

  async execute(pseudo: any, token?: Token): Promise<string> {
    await this.checkBusinessRules(pseudo, token);
    return await this.recipeListRepository.deleteAll(pseudo);
  }

  private async checkBusinessRules(
    pseudo: any,
    token?: Token
  ): Promise<void> {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit de supprimer ces ressources"
      );
    } else {
      if (pseudo) {
        if (await !this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
        if (token.pseudo !== pseudo) {
          throw new TechnicalException("Problème technique");
        }
      } else {
        throw new BusinessException(
          "Le pseudo d'un utilisateur est obligatoire"
        );
      }
    }
  }
}
