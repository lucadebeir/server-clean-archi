import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { TechnicalException } from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import { isAdmin } from "../../utils/token.service";

export default class FindUsersXAbonnesUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(token?: TokenDomain): Promise<User[]> {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findUsersXAbonnes();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à cette ressource");
    }
  }
}
