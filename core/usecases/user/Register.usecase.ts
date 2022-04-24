import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";
import CryptRepository from "../../ports/crypt/Crypt.repository";

export default class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailingRepository: MailingRepository,
    private cryptRepository: CryptRepository
  ) {}

  async execute(user: User, link: any): Promise<User> {
    user = await this.checkBusinessRules(user);
    user = await this.userRepository.register(user);
    this.mailingRepository.sendMailAfterRegister(user, link);
    return user;
  }

  private async checkBusinessRules(user: User): Promise<User> {

      if (
        user.pseudo &&
        this.checkIfValueIsValid(4, user.pseudo, "pseudo", true) &&
        this.checkIfValueIsValid(29, user.pseudo, "pseudo", false)
      ) {
        if(await this.userRepository.existByPseudo(user.pseudo)) {
          throw new BusinessException(
            "Un utilisateur existe déjà avec ce pseudo"
          );
        } else {
          if (user.email &&
            this.checkIfValueIsValid(59, user.email, "email", false)
              ) {
                if(await this.userRepository.existByEmail(user.email)) {
                  throw new BusinessException(
                    "Un utilisateur existe déjà avec cet email"
                  );
                } else {
                  if (user.password) {
                    if (user.confirmed_password) {
                      if (user.confirmed_password !== user.password) {
                        throw new BusinessException(
                          "Le mot de passe et la confirmation du mot de passe sont différents"
                        );
                      } else {
                        user.password = await this.cryptRepository.crypt(user.password);
                        return user;
                      }
                    } else {
                      throw new BusinessException(
                        "La confirmation du mot de passe est obligatoire"
                      );
                    }
                  } else {
                    throw new BusinessException(
                      "Le mot de passe est obligatoire"
                    );
                  }
                }
          } else {
            throw new BusinessException("L'email est obligatoire");
          }
        }
      } else {
        throw new BusinessException("Le pseudo est obligatoire");
      }
    
  }

  private checkIfValueIsValid(chiffre: number, valueS?: string, champ?: string, inf?: boolean): boolean {
    if (!inf) {
      if (valueS && valueS.length > chiffre) {
        throw new BusinessException("Un " + champ + " ne peut pas comporter plus de " + chiffre + " caractères");
      } else {
        return true;
      }
    } else {
      if (valueS && valueS.length < chiffre) {
        throw new BusinessException("Un " + champ + " ne peut pas comporter moins de " + chiffre + " caractères");
      } else {
        return true;
      }
    }
  }
}
