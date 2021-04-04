import Menu from "../../domain/Menu";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import MenuRepository from "../../ports/repositories/Menu.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { isAdmin } from "../../utils/token.service";

export default class UpdateMenuByIdUseCase {
  constructor(
    private menuRepository: MenuRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(menu: Menu, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(menu, token);
    return await this.menuRepository.updateById(menu.idMenu, menu.idRecette);
  }

  private checkBusinessRules(menu: Menu, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (menu.idMenu) {
        if (this.menuRepository.existById(menu.idMenu)) {
          if (menu.idRecette) {
            if (!this.recipeRepository.existById(menu.idRecette)) {
              throw new BusinessException(
                "L'identifiant de recette " +
                  menu.idMenu +
                  " ne correspond à aucune ressource existante"
              );
            }
          } else {
            throw new BusinessException(
              "L'identifiant d'une recette est obligatoire"
            );
          }
        } else {
          throw new BusinessException(
            "L'identifiant de menu " +
              menu.idMenu +
              " ne correspond à aucune ressource existante"
          );
        }
      } else {
        throw new BusinessException("L'identifiant du menu est obligatoire");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  }
}
