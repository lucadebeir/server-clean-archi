import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User, token?: TokenDomain): Promise<User> {
    await this.checkBusinessRules(user, token);
    return this.userRepository.update(user);
  }

  private async checkBusinessRules(
    user: User,
    token?: TokenDomain
  ): Promise<void> {
    if (token && isLogin(token)) {
      if (
        user.email &&
        this.checkIfValueIsValid(59, user.email, "email", false)
      ) {
        if (
          (await this.userRepository.existByEmail(user.email)) &&
          token.email != user.email
        ) {
          throw new BusinessException(
            "Un utilisateur existe déjà avec cet email"
          );
        }
      } else {
        throw new BusinessException("L'email est obligatoire");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
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
