import NotationDomain from "../../domain/Notation.domain";
import NotationRepository from "../../ports/repositories/Notation.repository";

export default class SaveNotationUseCase {
  constructor(private notationRepository: NotationRepository) {}

  async execute(notation: NotationDomain): Promise<NotationDomain> {
    return this.notationRepository.save(notation);
  }
}
