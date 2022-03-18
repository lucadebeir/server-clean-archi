import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindNbAbonnesUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(token?: Token): Promise<number> {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findNbAbonnes();
  }

  private checkBusinessRules(token?: Token): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à cette ressource");
    }
  }
}
