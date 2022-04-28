import Notation from "../../domain/Notation";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class SaveNotationUseCase {
  constructor(private notationRepository: NotationRepository) {}

  execute = async (notation: Notation): Promise<Notation> => this.notationRepository.save(notation);
}
