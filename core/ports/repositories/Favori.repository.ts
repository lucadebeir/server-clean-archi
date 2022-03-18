import Favori from "../../domain/Favori";
import Recipe from "../../domain/Recipe";
import RecipesFilter from "../../domain/RecipesFilter";

export default interface FavoriRepository {
  create(favori: Favori): Promise<string>;
  findByIdUser(id: any): Promise<Recipe[]>;
  findByIdUserPerToCategory(id: any, idCategorie: any): Promise<Recipe[]>;
  deleteById(favori: Favori): Promise<string>;

  check(favori: Favori): Promise<boolean>;

  research(data: RecipesFilter, pseudo: string): Promise<Recipe[]>;
}
