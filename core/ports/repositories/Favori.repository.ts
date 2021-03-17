import Favori from "../../domain/Favori";

export default interface FavoriRepository {
  create(favori: Favori): Promise<Favori>;
  findByIdUser(id: any): Promise<Favori[]>;
  findByIdUserPerToCategory(id: any, idCategorie: any): Promise<Favori[]>;
  deleteById(id: any): Promise<string>;
}
