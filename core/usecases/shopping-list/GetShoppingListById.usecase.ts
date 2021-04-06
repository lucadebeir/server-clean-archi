import Shopping from "../../domain/Shopping";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class GetShoppingListByIdUseCase {
  constructor(
    private shoppingRepository: ShoppingRepository,
    private userRepository: UserRepository
  ) {}

  async execute(pseudo: any, token?: TokenDomain): Promise<Shopping[]> {
    this.checkBusinessRules(pseudo, token);
    return await this.shoppingRepository.findById(pseudo);
  }

  private checkBusinessRules(pseudo: any, token?: TokenDomain): void {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (!this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException(
            "L'identifiant " +
              pseudo +
              " ne correspond à aucune ressource existante"
          );
        }
      } else {
        throw new BusinessException(
          "L'identifiant d'un utilisateur est obligatoire"
        );
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'accéder à ces ressources"
      );
    }
  }
}
