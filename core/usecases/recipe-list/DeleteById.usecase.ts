import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import RecipeListRepository from "../../ports/repositories/RecipeList.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class DeleteByIdUseCase {
  constructor(
    private recipeListRepository: RecipeListRepository,
    private userRepository: UserRepository
  ) {}

  async execute(id: any, pseudo: any, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(id, pseudo, token);
    return await this.recipeListRepository.deleteById(id, pseudo);
  }

  private checkBusinessRules(id: any, pseudo: any, token?: TokenDomain): void {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    } else {
      if (id) {
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
      } else {
        throw new BusinessException(
          "L'identifiant de la recette à supprimer est obligatoire"
        );
      }
    }
  }
}
