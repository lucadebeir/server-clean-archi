import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import { isAdmin } from "../../utils/token.service";

export default class FindNbViewsSince30DaysUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(token?: TokenDomain): Promise<{ nbVues: any; date: any }[]> {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findNbViewsSince30Days();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à cette ressource");
    }
  }
}
