import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class CheckExistRecipeByPseudoUseCase {
  constructor(
    private recipeListRepository: RecipeListRepository,
    private userRepository: UserRepository
  ) {}

  async execute(id: any, pseudo: any, token?: TokenDomain): Promise<boolean> {
    this.checkBusinessRules(pseudo, token);
    return await this.recipeListRepository.existById(id, pseudo);
  }

  private checkBusinessRules(pseudo: any, token?: TokenDomain): void {
    console.log(token);
    console.log(pseudo);
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'ajouter cette ressource"
      );
    } else {
      if (pseudo) {
        if (!this.userRepository.existByPseudo(pseudo)) {
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
