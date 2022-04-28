import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import MenuRepository from "../../ports/repositories/Menu.repository";
import {isAdmin} from "../../utils/token.service";

export default class GetMenuBydIdUseCase {
  constructor(private menuRepository: MenuRepository) {}

  execute = async (id: any, token?: Token): Promise<Recipe> => {
    await this.checkBusinessRules(id, token);
    return await this.menuRepository.findById(id);
  };

  private checkBusinessRules = async (id: any, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (id) {
        if (!await this.menuRepository.existById(id)) {
          throw new BusinessException("L'identifiant " + id + " ne correspond à aucune ressource existante");
        }
      } else {
        throw new BusinessException("L'identifiant d'une recette du menu est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
