import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbUsersMonthlyUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbUsersMonthly();
  }
}
