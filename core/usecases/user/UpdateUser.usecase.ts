import Token from "../../domain/Token";
import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute = async (user: User, token?: Token): Promise<User> => {
    await this.checkBusinessRules(user, token);
    return this.userRepository.update(user);
  };

  private checkBusinessRules = async (user: User, token?: Token): Promise<void> => {
    if (token && isLogin(token)) {
      if (user.email && user.checkIfValueIsValid(59, user.email, "email", false)) {
        if (await this.userRepository.existByEmail(user.email) && token.email != user.email) {
          throw new BusinessException("Un utilisateur existe déjà avec cet email");
        }
      } else {
        throw new BusinessException("L'email est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit de modifier cette ressource");
    }
  };
}
