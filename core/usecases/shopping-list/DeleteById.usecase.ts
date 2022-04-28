import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class DeleteByIdUseCase {
  constructor(private shoppingRepository: ShoppingRepository, private userRepository: UserRepository) {}

  execute = async (id: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(id, token);
    return await this.shoppingRepository.deleteById(id);
  };

  private checkBusinessRules = async (id: any, token?: Token): Promise<void> => {
    if (token && isLogin(token)) {
      if (id) {
        if (!await this.userRepository.existByPseudo(token.pseudo)) {
          throw new BusinessException("L'identifiant " + token.pseudo + " ne correspond à aucune ressource existante");
        }
      } else {
        throw new BusinessException("L'identifiant d'un élément de la liste de courses est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit de supprimer à ces ressources");
    }
  };
}
