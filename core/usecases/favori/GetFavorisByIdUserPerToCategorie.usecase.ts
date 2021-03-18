import Favori from "../../domain/Favori";
import FavoriRepository from "../../ports/repositories/Favori.repository";

export default class GetFavorisByIdUserPerToCategorieUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(id: any, idCategorie: any): Promise<Favori[]> {
    return await this.favoriRepository.findByIdUserPerToCategory(
      id,
      idCategorie
    );
  }
}
