import Favori from "../../domain/Favori";
import Recipe from "../../domain/Recipe";
import RecipesFilterDomain from "../../domain/RecipesFilter.domain";

export default interface FavoriRepository {
  create(favori: Favori): Promise<string>;
  findByIdUser(id: any): Promise<Recipe[]>;
  findByIdUserPerToCategory(id: any, idCategorie: any): Promise<Favori[]>;
  deleteById(favori: Favori): Promise<string>;

  check(favori: Favori): Promise<boolean>;

  research(data: RecipesFilterDomain, pseudo: string): Promise<Recipe[]>;
}
