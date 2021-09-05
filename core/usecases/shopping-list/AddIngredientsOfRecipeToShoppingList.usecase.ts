import Ingredient from "../../domain/Ingredient";
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
    list = await this.checkBusinessRules(pseudo, list, token);
    return await this.shoppingRepository.addIngredientsOfRecipeToShoppingList(
      pseudo,
      list
    );
  }

  private async checkBusinessRules(
    pseudo: any,
    list: Ingredient[],
    token?: TokenDomain
  ): Promise<Ingredient[]> {
    if (token && isLogin(token)) {
      if (pseudo) {
        if (await this.userRepository.existByPseudo(pseudo)) {
          return list.filter(
            async (ingredient) =>
              await !this.shoppingRepository.exist(
                pseudo,
                ingredient.name
              )
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
