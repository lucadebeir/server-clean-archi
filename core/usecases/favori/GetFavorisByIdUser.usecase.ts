import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import {isLogin} from "../../utils/token.service";

export default class GetFavorisByIdUserUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(pseudo: any, token?: Token): Promise<Recipe[]> {
    this.checkBusinessRules(pseudo, token);
    return await this.favoriRepository.findByIdUser(token?.pseudo);
  }

  private checkBusinessRules(pseudo: any, token?: Token): void {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    } else {
      if (token.pseudo !== pseudo) {
        throw new TechnicalException("Problème technique");
      }
    }
  }
}
