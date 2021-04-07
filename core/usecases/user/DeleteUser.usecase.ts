import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(pseudo: any, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(pseudo, token);
    return this.userRepository.deleteById(pseudo);
  }

  private checkBusinessRules(pseudo: any, token?: TokenDomain): void {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (!this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        } else {
          if (token.pseudo != pseudo) {
            throw new BusinessException(
              "La personne connectée n'est pas la personne correspondant au pseudo en question"
            );
          }
        }
      } else {
        throw new BusinessException("Le pseudo est obligatoire");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de supprimer cette ressource"
      );
    }
  }
}
