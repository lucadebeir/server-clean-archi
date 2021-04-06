import shopping from "../../../adaptater/primaries/rest/endpoints/Shopping";
import Ingredient from "../../domain/Ingredient";
import Shopping from "../../domain/Shopping";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ShoppingRepository from "../../ports/repositories/Shopping.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class AddIngredientsOfRecipeToShoppingListUseCase {
  constructor(
    private shoppingRepository: ShoppingRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    pseudo: any,
    list: Ingredient[],
    token?: TokenDomain
  ): Promise<string> {
    list = this.checkBusinessRules(pseudo, list, token);
    return await this.shoppingRepository.addIngredientsOfRecipeToShoppingList(
      pseudo,
      list
    );
  }

  private checkBusinessRules(
    pseudo: any,
    list: Ingredient[],
    token?: TokenDomain
  ): Ingredient[] {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (this.userRepository.existByPseudo(pseudo)) {
          return list.filter(
            (ingredient) =>
              !this.shoppingRepository.exist(pseudo, ingredient.nomIngredient)
          );
        } else {
          throw new BusinessException(
            "L'identifiant " +
              pseudo +
              " ne correspond à aucune ressource existante"
          );
        }
      } else {
        throw new BusinessException(
          "L'identifiant d'un utilisateur est obligatoire"
        );
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'ajouter ces ressources"
      );
    }
  }
}
