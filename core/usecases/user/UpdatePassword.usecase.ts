import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any,
    token?: TokenDomain
  ): Promise<User> {
    await this.checkBusinessRules(
      pseudo,
      oldPassword,
      newPassword,
      confirmNewPassword,
      token
    );
    return this.userRepository.updatePassword(pseudo, newPassword);
  }

  private async checkBusinessRules(
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any,
    token?: TokenDomain
  ): Promise<void> {
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
            if (token.mdp != oldPassword) {
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
  }
}
