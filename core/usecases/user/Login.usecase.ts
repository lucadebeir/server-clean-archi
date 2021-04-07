import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(pseudo: any, password: any): Promise<TokenDomain> {
    this.checkBusinessRules(pseudo, password);
    return this.userRepository.login(pseudo, password);
  }

  private checkBusinessRules(pseudo: any, password: any): void {
    if (pseudo) {
      if (!this.userRepository.existByPseudo(pseudo)) {
        throw new BusinessException(
          "Aucun utilisateur n'existe avec ce pseudo"
        );
      }
      if (password) {
        if (!this.userRepository.checkEmailConfirmed(pseudo)) {
          throw new BusinessException(
            "L'email de l'utilisateur n'est pas confirmé"
          );
        }
      } else {
        throw new BusinessException("Le mot de passe est obligatoire");
      }
    } else {
      throw new BusinessException("Le pseudo est obligatoire");
    }
  }
}
