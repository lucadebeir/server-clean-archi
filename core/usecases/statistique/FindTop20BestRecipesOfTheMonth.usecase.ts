import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindTop20BestRecipesOfTheMonthUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(
    token?: Token
  ): Promise<{ name: any; number_views: any }[]> {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findTop20BestRecipesOfTheMonth();
  }

  private checkBusinessRules(token?: Token): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à cette ressource");
    }
  }
}
