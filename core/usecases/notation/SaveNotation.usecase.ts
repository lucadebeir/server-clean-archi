import Notation from "../../domain/Notation";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class SaveNotationUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(notation: Notation): Promise<Notation> {
    console.log(notation)
    return this.notationRepository.save(notation);
  }
}
