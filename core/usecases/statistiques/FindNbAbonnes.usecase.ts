import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbAbonnesUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbAbonnes();
  }
}
