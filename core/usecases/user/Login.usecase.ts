import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";
import CryptRepository from "../../ports/crypt/Crypt.repository";

export default class LoginUseCase {
  constructor(private userRepository: UserRepository, private cryptRepository: CryptRepository) {}

  async execute(email: any, password: any): Promise<Token> {
    await this.checkBusinessRules(email, password);
    const user: Token = await this.userRepository.login(email, password);
    await this.checkPassword(password, user);
    return user;
  }

  async checkPassword(password: string, user: Token): Promise<void> {
    if (!await this.cryptRepository.compare(password, user.password)) {
      throw new BusinessException("Mot de passe et/ou email incorrect");
    }
  }

  private async checkBusinessRules(email: any, password: any): Promise<void> {

      if (email) {
        if(await this.userRepository.existByEmail(email)) {
          if (password) {
            if(!await this.userRepository.checkEmailConfirmed(email)) {
              throw new BusinessException("L'email de l'utilisateur n'est pas confirmé");
            }
          } else {
            throw new BusinessException("Le mot de passe est obligatoire");
          }
        } else {
          throw new BusinessException("Aucun utilisateur n'existe avec cet email");
        }
      } else {
        throw new BusinessException("L'email est obligatoire");
      }
    
  }
}
