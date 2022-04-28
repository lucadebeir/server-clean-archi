import Ingredient from "../../domain/Ingredient";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class FindIngredientsNotInShoppingListByIdUsecase {
  constructor(private shoppingRepository: ShoppingRepository, private userRepository: UserRepository) {}

  execute = async (pseudo: any, token?: Token): Promise<Ingredient[]> => {
    this.checkBusinessRules(pseudo, token);
    return await this.shoppingRepository.findIngredientsNotInShoppingListById(pseudo);
  };

  private checkBusinessRules = (pseudo: any, token?: Token): void => {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (!this.userRepository.existByPseudo(pseudo)) {
          throw new BusinessException("L'identifiant " + pseudo + " ne correspond à aucune ressource existante");
        }
      } else {
        throw new BusinessException("L'identifiant d'un utilisateur est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit d'accéder à ces ressources");
    }
  };
}
