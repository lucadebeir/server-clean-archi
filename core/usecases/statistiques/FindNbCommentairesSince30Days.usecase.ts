import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbCommentairesSince30DaysUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbCommentairesSince30Days();
  }
}
