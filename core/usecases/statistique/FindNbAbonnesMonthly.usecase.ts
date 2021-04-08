import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import { isAdmin } from "../../utils/token.service";

export default class FindNbAbonnesMonthlyUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(
    token?: TokenDomain
  ): Promise<{ nbAbonnes: any; month: any }[]> {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findNbAbonnesMonthly();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à cette ressource");
    }
  }
}
