import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import { isLogin } from "../../utils/token.service";

export default class CheckFavoriByPseudoUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(favori: Favori, token?: TokenDomain): Promise<boolean> {
    this.checkBusinessRules(favori, token);
    return await this.favoriRepository.check(favori);
  }

  private checkBusinessRules(favori?: Favori, token?: TokenDomain): void {
    if (token && isLogin(token)) {
      if (!favori) {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new TechnicalException(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    }
  }
}
