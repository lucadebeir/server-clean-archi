import NotationDomain from "../../domain/Notation.domain";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class FindByPseudoUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(idRecipe: any, pseudo: string): Promise<NotationDomain> {
    return this.notationRepository.findByPseudo(idRecipe, pseudo);
  }
}
