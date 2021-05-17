import NotationRepository from "../../../../core/ports/repositories/Notation.repository";
import FindByPseudoUseCase from "../../../../core/usecases/notation/FindByPseudo.usecase";
import SaveNotationUseCase from "../../../../core/usecases/notation/SaveNotation.usecase";
import NotationRepositorySQL from "../../../secondaries/mysql/repositories/NotationRepositorySQL";

export default class NotationConfig {
  private notationRepository: NotationRepository = new NotationRepositorySQL();

  public getSaveNotationUseCase(): SaveNotationUseCase {
    return new SaveNotationUseCase(this.notationRepository);
  }

  public getFindByPseudoUseCase(): FindByPseudoUseCase {
    return new FindByPseudoUseCase(this.notationRepository);
  }
}
