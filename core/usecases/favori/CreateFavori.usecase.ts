import commentaire from "../../../adaptater/primaries/rest/endpoints/Commentaire";
import Favori from "../../domain/Favori";
import FavoriRepository from "../../ports/repositories/Favori.repository";

export default class CreateFavoriUseCase {
  constructor(private favoriRepository: FavoriRepository) {}

  async execute(favori: Favori): Promise<string> {
    return await this.favoriRepository.create(favori);
  }
}
