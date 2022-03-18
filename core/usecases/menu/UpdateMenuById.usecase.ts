import Menu from "../../domain/Menu";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import MenuRepository from "../../ports/repositories/Menu.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateMenuByIdUseCase {
  constructor(
    private menuRepository: MenuRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(menu: Menu, token?: Token): Promise<string> {
    await this.checkBusinessRules(menu, token);
    return await this.menuRepository.updateById(menu.id, menu.id_recipe);
  }

  private async checkBusinessRules(menu: Menu, token?: Token): Promise<void> {
    if (token && isAdmin(token)) {
      if (menu.id) {
        if (await this.menuRepository.existById(menu.id)) {
          if (menu.id_recipe) {
            if (await !this.recipeRepository.existById(menu.id_recipe)) {
              throw new BusinessException(
                "L'identifiant de recette " +
                  menu.id +
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
              menu.id +
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
