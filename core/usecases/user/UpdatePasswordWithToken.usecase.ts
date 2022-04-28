import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import {isExpired} from "../../utils/token.service";
import CryptRepository from "../../ports/crypt/Crypt.repository";

export default class UpdatePasswordWithTokenUseCase {
  constructor(private userRepository: UserRepository, private cryptRepository: CryptRepository) {}

  execute = async (token?: Token, newPassword?: any): Promise<string> => {
    this.checkBusinessRules(token, newPassword);
    const hash: string = await this.cryptRepository.crypt(newPassword);
    return await this.userRepository.updatePasswordWithToken(token, hash);
  };

  private checkBusinessRules = (token?: Token, new_password?: any): void => {
    if (token && !isExpired(token)) {
      if (!new_password) {
        throw new BusinessException("Le mot de passe est obligatoire");
      }
    } else {
      throw new TechnicalException("Le lien n'est plus valide. Il n'est valable que 5min. Veuillez recommencer le processus.");
    }
  };
}
