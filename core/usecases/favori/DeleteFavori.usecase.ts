import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import { isLogin } from "../../utils/token.service";

export default class DeleteFavoriUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(id: any, pseudo: any, token?: TokenDomain): Promise<string> {
    const favori: Favori = {
      idRecette: id,
      pseudo: pseudo
    }
    this.checkBusinessRules(favori, token);
    return await this.favoriRepository.deleteById(favori);
  }

  private checkBusinessRules(favori?: Favori, token?: TokenDomain): void {
    if (token && isLogin(token)) {
      if (favori) {
        if (!this.favoriRepository.check(favori)) {
          throw new BusinessException(
              "Cette recette n'existe pas dans la liste des recettes favorites de l'utilisateur " +
                favori.pseudo
            );
          }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  }
}
