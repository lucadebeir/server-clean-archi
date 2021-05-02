import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class GoogleRegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    this.checkBusinessRules(user);
    return this.userRepository.gRegister(user);
  }

  private checkBusinessRules(user: User): Promise<void> {
    if (
      user.pseudo &&
      this.checkIfValueIsValid(4, user.pseudo, "pseudo", true) &&
      this.checkIfValueIsValid(29, user.pseudo, "pseudo", false)
    ) {
      return this.userRepository
        .existByPseudo(user.pseudo)
        .then((pseudo) => {
          if (pseudo) {
            throw new BusinessException(
              "Un utilisateur existe déjà avec ce pseudo"
            );
          } else {
            if (
              user.email &&
              this.checkIfValueIsValid(59, user.email, "email", false)
            ) {
              this.userRepository
                .existByEmail(user.email)
                .then((email) => {
                  if (email) {
                    throw new BusinessException(
                      "Un utilisateur existe déjà avec cet email"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              throw new BusinessException("L'email est obligatoire");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
