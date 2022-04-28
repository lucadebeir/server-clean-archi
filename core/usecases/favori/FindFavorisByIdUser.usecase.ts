import Recipe from "../../domain/Recipe";
import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import FavoriRepository from "../../ports/repositories/Favori.repository";
import {isLogin} from "../../utils/token.service";
import {updateDataRecipe} from "../../utils/recipe";

export default class FindFavorisByIdUserUsecase {
  constructor(private favoriRepository: FavoriRepository) {}

  execute = async (pseudo: any, token?: Token): Promise<Recipe[]> => {
    this.checkBusinessRules(pseudo, token);
    const result: Recipe[] = await this.favoriRepository.findByIdUser(token?.pseudo);
    result.map((recipe) => updateDataRecipe(recipe));
    return result;
  };

  private checkBusinessRules = (pseudo: any, token?: Token): void => {
    if (!token || !isLogin(token)) throw new TechnicalException("Vous n'avez pas le droit de créer cette ressource");
    else {
      if (token.pseudo !== pseudo) throw new TechnicalException("Problème technique");
    }
  };
}
