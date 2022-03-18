import Favori from "../../domain/Favori";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import {isLogin} from "../../utils/token.service";

export default class CreateFavoriUseCase {
  constructor(
    private favoriRepository: FavoriRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(favori: Favori, token?: Token): Promise<string> {
    await this.checkBusinessRules(favori, token);
    return await this.favoriRepository.create(favori);
  }

  private async checkBusinessRules(favori?: Favori, token?: Token): Promise<void> {
    if (token && isLogin(token)) {
      if (favori) {
        if (!favori.id_recipe || !await this.recipeRepository.existById(favori.id_recipe)) {
          throw new BusinessException("La recette doit exister");
        } else {
          if (await this.favoriRepository.check(favori)) {
            throw new BusinessException("Cette recette se trouve déjà dans la liste des recettes favorites de l'utilisateur " + favori.pseudo);
          }
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new TechnicalException("Vous n'avez pas le droit de créer cette ressource");
    }
  }
}
