import Favori from "../../domain/Favori";
import FavoriRepository from "../../ports/repositories/Favori.repository";

export default class DeleteFavoriUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(id: any, pseudo: any): Promise<string> {
    return await this.favoriRepository.deleteById(id, pseudo);
  }
}
