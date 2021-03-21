import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import FindNbViewsUseCase from "../../../../core/usecases/statistiques/FindNbViews.usecase";
import StatistiqueRepositorySQL from "../../../secondaries/mysql/repositories/StatistiqueRepositorySQL";

export default class StatistiqueConfig {
  public statistiqueRepository: StatistiqueRepository = new StatistiqueRepositorySQL();

  public findNbViewsUseCase(): FindNbViewsUseCase {
    return new FindNbViewsUseCase(this.statistiqueRepository);
  }
}
