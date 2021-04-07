import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isExpired } from "../../utils/token.service";

export default class UpdatePasswordWithTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token?: TokenDomain, newPassword?: any): Promise<string> {
    this.checkBusinessRules(token, newPassword);
    return this.userRepository.updatePasswordWithToken(token, newPassword);
  }

  private checkBusinessRules(token?: TokenDomain, newPassword?: any): void {
    if (token && !isExpired(token)) {
      if (!newPassword) {
        throw new BusinessException("Le mot de passe est obligatoire");
      }
    } else {
      throw new TechnicalException(
        "Le lien n'est plus valide. Il n'est valable que 5min. Veuillez recommencer le processus."
      );
    }
  }
}
