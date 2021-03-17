import Favori from "../../domain/Favori";
import FavoriRepository from "../../ports/repositories/Favori.repository";

export default class GetFavorisByIdUserUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(id: any): Promise<Favori[]> {
    return await this.favoriRepository.findByIdUser(id);
  }
}
