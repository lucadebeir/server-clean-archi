import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute = async (pseudo: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(pseudo, token);
    return this.userRepository.deleteById(pseudo);
  };

  private checkBusinessRules = async (pseudo: any, token?: Token): Promise<void> => {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (!await this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        } else {
          if (token.pseudo != pseudo) {
            throw new BusinessException("La personne connectée n'est pas la personne correspondant au pseudo en question");
          }
        }
      } else {
        throw new BusinessException("Le pseudo est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit de supprimer cette ressource");
    }
  };
}
