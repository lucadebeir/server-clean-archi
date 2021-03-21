import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindNbUsersUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<number> {
    return this.statistiqueRepository.findNbUsers();
  }
}
