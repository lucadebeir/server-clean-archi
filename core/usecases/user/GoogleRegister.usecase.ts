import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class GoogleRegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailingRepository: MailingRepository
  ) {}

  async execute(user: User, link: any): Promise<User> {
    console.log(user)
    await this.checkBusinessRules(user);
    //this.mailingRepository.sendMailAfterRegister(user, link);
    return this.userRepository.gRegister(user);
  }

  private async checkBusinessRules(user: User): Promise<void> {
    if (
      user.pseudo &&
      this.checkIfValueIsValid(4, user.pseudo, "pseudo", true) &&
      this.checkIfValueIsValid(29, user.pseudo, "pseudo", false)
    ) {
      const checkPseudo = await this.userRepository.existByPseudo(user.pseudo);
      if (checkPseudo) {
        throw new BusinessException(
          "Un utilisateur existe déjà avec ce pseudo"
        );
      } else {
        if (
          user.email &&
          this.checkIfValueIsValid(59, user.email, "email", false)
        ) {
          const checkEmail = await this.userRepository.existByEmail(user.email);
          if (checkEmail) {
            throw new BusinessException(
              "Un utilisateur existe déjà avec cet email"
            );
          }
        } else {
          throw new BusinessException("L'email est obligatoire");
        }
      }
    } else {
      throw new BusinessException("Le pseudo est obligatoire");
    }
  }

  private checkIfValueIsValid(
    chiffre: number,
    valueS?: string,
    champ?: string,
    inf?: boolean
  ): boolean {
    if (!inf) {
      if (valueS && valueS.length > chiffre) {
        throw new BusinessException(
          "Un " +
            champ +
            " ne peut pas comporter plus de " +
            chiffre +
            " caractères"
        );
      } else {
        return true;
      }
    } else {
      if (valueS && valueS.length < chiffre) {
        throw new BusinessException(
          "Un " +
            champ +
            " ne peut pas comporter moins de " +
            chiffre +
            " caractères"
        );
      } else {
        return true;
      }
    }
  }
}
