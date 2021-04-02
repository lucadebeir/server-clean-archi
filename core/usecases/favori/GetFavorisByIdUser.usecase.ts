import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import { isLogin } from "../../utils/token.service";

export default class GetFavorisByIdUserUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(pseudo: any, token?: TokenDomain): Promise<Favori[]> {
    this.checkBusinessRules(pseudo, token);
    return await this.favoriRepository.findByIdUser(token?.pseudo);
  }

  private checkBusinessRules(pseudo: any, token?: TokenDomain): void {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    } else {
      if(token.pseudo !== pseudo) {
        throw new TechnicalException("Problème technique")
      }
    }
  }
}
