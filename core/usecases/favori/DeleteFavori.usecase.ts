import Favori from "../../domain/Favori";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import {isLogin} from "../../utils/token.service";

export default class DeleteFavoriUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  execute = async (id: any, pseudo: any, token?: Token): Promise<string> => {
    const favori: Favori = {
      id_recipe: id,
      pseudo: pseudo
    }
    await this.checkBusinessRules(favori, token);
    return await this.favoriRepository.deleteById(favori);
  };

  private checkBusinessRules = async (favori?: Favori, token?: Token): Promise<void> => {
    if (token && isLogin(token)) {
      if (favori) {
        if (!await this.favoriRepository.check(favori)) {
          throw new BusinessException("Cette recette n'existe pas dans la liste des recettes favorites de l'utilisateur " + favori.pseudo);
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit de créer cette ressource");
    }
  };
}
