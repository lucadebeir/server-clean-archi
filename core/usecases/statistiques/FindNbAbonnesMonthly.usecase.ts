import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbAbonnesMonthlyUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbAbonnesMonthly();
  }
}
