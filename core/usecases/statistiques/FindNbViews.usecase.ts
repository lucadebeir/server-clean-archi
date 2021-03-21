import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbViewsUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbViews();
  }
}
