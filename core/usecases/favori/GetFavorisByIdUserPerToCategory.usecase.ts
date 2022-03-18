import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CategoryRepository from "../../ports/repositories/Category.repository";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import {isLogin} from "../../utils/token.service";
import Recipe from "../../domain/Recipe";

export default class GetFavorisByIdUserPerToCategoryUseCase {
  constructor(private favoriRepository: FavoriRepository, private categoryRepository: CategoryRepository) {}

  async execute(pseudo: any, idCategorie: any, token?: Token): Promise<Recipe[]> {
    this.checkBusinessRules(pseudo, idCategorie, token);
    return await this.favoriRepository.findByIdUserPerToCategory(
      pseudo,
      idCategorie
    );
  }

  private checkBusinessRules(pseudo: any, idCategorie: any, token?: Token): void {
    if (!token || !isLogin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit de créer cette ressource"
      );
    } else {
      if(token.pseudo !== pseudo) {
        throw new TechnicalException("Problème technique")
      } else {
        if(!this.categoryRepository.existById(idCategorie)) {
          throw new BusinessException("La catégorie avec l'identifiant " + idCategorie + " n'existe pas")
        }
      }
    }
  }
}
