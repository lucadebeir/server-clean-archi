import Notation from "../../domain/Notation";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class SaveNotationUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(notation: Notation): Promise<Notation> {
    return this.notationRepository.save(notation);
  }
}
