import Recipe from "../../domain/Recipe";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";

export default class FindTop20BestRecipesOfTheMonthUseCase {
  constructor(private statistiqueRepository: StatistiqueRepository) {}

  async execute(): Promise<any> {
    return this.statistiqueRepository.findTop20BestRecipesOfTheMonth();
  }
}
