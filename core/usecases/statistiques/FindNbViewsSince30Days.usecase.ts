import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbViewsSince30DaysUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbViewsSince30Days();
  }
}
