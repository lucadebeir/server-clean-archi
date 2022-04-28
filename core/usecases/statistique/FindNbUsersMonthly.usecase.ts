import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindNbUsersMonthlyUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  execute = async (token?: Token): Promise<{ number_users: any; month: any }[]> => {
    this.checkBusinessRules(token);
    return this.statistiqueRepository.findNbUsersMonthly();
  };

  private checkBusinessRules = (token?: Token): void => {
    if (!token || !isAdmin(token)) throw new TechnicalException("Vous n'avez pas accès à cette ressource");
  };
}
