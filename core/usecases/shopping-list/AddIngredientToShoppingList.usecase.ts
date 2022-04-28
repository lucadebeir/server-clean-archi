import Shopping from "../../domain/Shopping";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class AddIngredientToShoppingListUseCase {
  constructor(private shoppingRepository: ShoppingRepository, private userRepository: UserRepository) {}

  execute = async (shopping: Shopping, token?: Token): Promise<string> => {
    await this.checkBusinessRules(shopping, token);
    return await this.shoppingRepository.addIngredientToShoppingList(shopping);
  };

  private checkBusinessRules = async (shopping: Shopping, token?: Token): Promise<void> => {
    if (token && isLogin(token)) {
      if (shopping.pseudo) {
        if (await this.userRepository.existByPseudo(shopping.pseudo)) {
          if (shopping.name_ingredient) {
            if (await this.shoppingRepository.exist(shopping.pseudo, shopping.name_ingredient)) {
              throw new BusinessException("L'ingrédient " + shopping.name_ingredient + " se trouve déjà dans la liste de courses de l'utilisateur " + shopping.pseudo);
            }
            if (shopping.name_ingredient.length > 40) {
              throw new BusinessException("Le nom d'un ingrédient ne doit pas dépasser 40 caractères");
            }
            if (shopping.quantity) {
              if (shopping.quantity <= 0) {
                throw new BusinessException("La quantité doit être strictement supérieur à 0");
              } else {
                if (!shopping.unit) {
                  throw new BusinessException("L'unité est obligatoire");
                }
              }
            } else {
              throw new BusinessException("La quantité est obligatoire");
            }
          } else {
            throw new BusinessException("Le nom d'un ingrédient est obligatoire");
          }
        } else {
          throw new BusinessException("L'identifiant " + shopping.pseudo + " ne correspond à aucune ressource existante");
        }
      } else {
        throw new BusinessException("L'identifiant d'un utilisateur est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit d'ajouter cette ressource");
    }
  };
}
