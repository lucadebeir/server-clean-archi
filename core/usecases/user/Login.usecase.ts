import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any, password: any): Promise<TokenDomain> {
    await this.checkBusinessRules(email, password);
    return this.userRepository.login(email, password);
  }

  private async checkBusinessRules(email: any, password: any): Promise<void> {

      if (email) {
        if(await this.userRepository.existByEmail(email)) {
          if (password) {
            if(!await this.userRepository.checkEmailConfirmed(email)) {
              throw new BusinessException(
                "L'email de l'utilisateur n'est pas confirmé"
              );
            }
          } else {
            throw new BusinessException("Le mot de passe est obligatoire");
          }
        } else {
          throw new BusinessException(
            "Aucun utilisateur n'existe avec cet email"
          );
        }
      } else {
        throw new BusinessException("L'email est obligatoire");
      }
    
  }
}
