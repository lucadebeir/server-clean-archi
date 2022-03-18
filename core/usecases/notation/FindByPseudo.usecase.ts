import Notation from "../../domain/Notation";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class FindByPseudoUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(id_recipe: any, pseudo: string): Promise<Notation> {
    return this.notationRepository.findByPseudo(id_recipe, pseudo);
  }
}
