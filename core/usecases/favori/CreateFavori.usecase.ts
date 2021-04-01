import commentaire from "../../../adaptater/primaries/rest/endpoints/Commentaire";
import Favori from "../../domain/Favori";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import { isAdmin } from "../../utils/token.service";

export default class CreateFavoriUseCase {
  constructor(
    private favoriRepository: FavoriRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(favori: Favori, token?: TokenDomain): Promise<string> {
    this.checkBusinessRules(favori, token);
    return await this.favoriRepository.create(favori);
  }

  private checkBusinessRules(favori?: Favori, token?: TokenDomain): void {
    if (token && isAdmin(token)) {
      if (favori) {
        if (
          !favori.idRecette ||
          !this.recipeRepository.existById(favori.idRecette)
        ) {
          throw new BusinessException("La recette doit exister");
        } else {
          if (this.favoriRepository.check(favori)) {
            throw new BusinessException(
              "Cette recette se trouve déjà dans la liste des recettes favorites de l'utilisateur " +
                favori.pseudo
            );
          }
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
