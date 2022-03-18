import Token from "../../domain/Token";
import User from "../../domain/User";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";
import CryptRepository from "../../ports/crypt/Crypt.repository";

export default class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository, private cryptRepository: CryptRepository) {}

  execute = async (
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any,
    token?: Token
  ): Promise<User> => {
    await this.checkBusinessRules(
      pseudo,
      oldPassword,
      newPassword,
      confirmNewPassword,
      token
    );
    const hash: string = await this.cryptRepository.crypt(newPassword);
    return this.userRepository.updatePassword(pseudo, hash);
  };

  private checkBusinessRules = async (
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any,
    token?: Token
  ): Promise<void> => {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (!await this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        } else {
          if (token.pseudo != pseudo) {
            throw new BusinessException(
              "La personne connectée n'est pas la personne correspondant au pseudo en question"
            );
          } else {
            if (token.password != oldPassword) {
              throw new BusinessException(
                "L'ancien mot de passe n'est pas correct"
              );
            } else {
              if (newPassword != confirmNewPassword) {
                throw new BusinessException(
                  "Le nouveau mot de passe et sa confirmation ne correspondent pas"
                );
              }
            }
          }
        }
      } else {
        throw new BusinessException("Le pseudo est obligatoire");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  };
}
