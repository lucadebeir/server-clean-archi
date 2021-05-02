import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any, password: any): Promise<TokenDomain> {
    this.checkBusinessRules(email, password);
    return this.userRepository.login(email, password);
  }

  private checkBusinessRules(email: any, password: any): void {
    if (email) {
      this.userRepository
        .existByEmail(email)
        .then((res) => {
          if (res) {
            if (password) {
              this.userRepository
                .checkEmailConfirmed(email)
                .then((check) => {
                  if (!check) {
                    throw new BusinessException(
                      "L'email de l'utilisateur n'est pas confirmé"
                    );
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              throw new BusinessException("Le mot de passe est obligatoire");
            }
          } else {
            throw new BusinessException(
              "Aucun utilisateur n'existe avec cet email"
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
}
