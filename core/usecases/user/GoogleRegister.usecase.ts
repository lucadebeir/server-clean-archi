import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class GoogleRegisterUseCase {
  constructor(private userRepository: UserRepository, private mailingRepository: MailingRepository) {}

  execute = async (user: User, link: any): Promise<User> => {
    await this.checkBusinessRules(user);
    //this.mailingRepository.sendMailAfterRegister(user, link);
    return this.userRepository.gRegister(user);
  };

  private async checkBusinessRules(user: User): Promise<void> {
    if (user.pseudo && user.checkIfValueIsValid(4, user.pseudo, "pseudo", true) &&
      user.checkIfValueIsValid(29, user.pseudo, "pseudo", false)) {
      const checkPseudo = await this.userRepository.existByPseudo(user.pseudo);
      if (checkPseudo) {
        throw new BusinessException("Un utilisateur existe déjà avec ce pseudo");
      } else {
        if (user.email && user.checkIfValueIsValid(59, user.email, "email", false)) {
          const checkEmail = await this.userRepository.existByEmail(user.email);
          if (checkEmail) {
            throw new BusinessException("Un utilisateur existe déjà avec cet email");
          }
        } else {
          throw new BusinessException("L'email est obligatoire");
        }
      }
    } else {
      throw new BusinessException("Le pseudo est obligatoire");
    }
  }
}
