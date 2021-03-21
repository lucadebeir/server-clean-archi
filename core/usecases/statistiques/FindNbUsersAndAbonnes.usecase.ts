import User from "../../domain/User";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindUsersXAbonnesUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<User[]> {
    return this.statistiqueRepository.findUsersXAbonnes();
  }
}
