import Favori from "../../domain/Favori";

export default interface FavoriRepository {
  create(favori: Favori): Promise<string>;
  findByIdUser(id: any): Promise<Favori[]>;
  findByIdUserPerToCategory(id: any, idCategorie: any): Promise<Favori[]>;
  deleteById(favori: Favori): Promise<string>;

  check(favori: Favori): Promise<boolean>;
}
