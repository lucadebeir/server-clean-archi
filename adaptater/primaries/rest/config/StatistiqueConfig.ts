import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import FindNbCommentairesSince30DaysUseCase from "../../../../core/usecases/statistiques/FindNbCommentairesSince30Days.usecase";
import FindNbViewsUseCase from "../../../../core/usecases/statistiques/FindNbViews.usecase";
import FindNbViewsSince30DaysUseCase from "../../../../core/usecases/statistiques/FindNbViewsSince30Days.usecase";
import FindTop20BestRecipesOfTheMonthUseCase from "../../../../core/usecases/statistiques/FindTop20BestRecipesOfTheMonth.usecase";
import StatistiqueRepositorySQL from "../../../secondaries/mysql/repositories/StatistiqueRepositorySQL";

export default class StatistiqueConfig {
  public statistiqueRepository: StatistiqueRepository = new StatistiqueRepositorySQL();

  public findNbViewsUseCase(): FindNbViewsUseCase {
    return new FindNbViewsUseCase(this.statistiqueRepository);
  }

  public findTop20BestRecipesOfTheMonthUseCase(): FindTop20BestRecipesOfTheMonthUseCase {
    return new FindTop20BestRecipesOfTheMonthUseCase(
      this.statistiqueRepository
    );
  }

  public findNbViewsSince30DaysUseCase(): FindNbViewsSince30DaysUseCase {
    return new FindNbViewsSince30DaysUseCase(this.statistiqueRepository);
  }

  public findNbCommentairesSince30DaysUseCase(): FindNbCommentairesSince30DaysUseCase {
    return new FindNbCommentairesSince30DaysUseCase(this.statistiqueRepository);
  }
}
