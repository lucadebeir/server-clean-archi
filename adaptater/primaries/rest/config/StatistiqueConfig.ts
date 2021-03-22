import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import FindNbAbonnesUseCase from "../../../../core/usecases/statistiques/FindNbAbonnes.usecase";
import FindNbAbonnesMonthlyUseCase from "../../../../core/usecases/statistiques/FindNbAbonnesMonthly.usecase";
import FindNbCommentairesUseCase from "../../../../core/usecases/statistiques/FindNbCommentaires.usecase";
import FindNbCommentairesSince30DaysUseCase from "../../../../core/usecases/statistiques/FindNbCommentairesSince30Days.usecase";
import FindNbUsersUseCase from "../../../../core/usecases/statistiques/FindNbUsers.usecase";
import FindUsersXAbonnesUseCase from "../../../../core/usecases/statistiques/FindNbUsersAndAbonnes.usecase";
import FindNbUsersMonthlyUseCase from "../../../../core/usecases/statistiques/FindNbUsersMonthly.usecase";
import FindNbViewsUseCase from "../../../../core/usecases/statistiques/FindNbViews.usecase";
import FindNbViewsSince30DaysUseCase from "../../../../core/usecases/statistiques/FindNbViewsSince30Days.usecase";
import FindTop20BestRecipesUseCase from "../../../../core/usecases/statistiques/FindTop20BestRecipes.usecase";
import FindTop20BestRecipesOfTheMonthUseCase from "../../../../core/usecases/statistiques/FindTop20BestRecipesOfTheMonth.usecase";
import FindTop20WorstRecipesUseCase from "../../../../core/usecases/statistiques/FindTop20WorstRecipes.usecase";
import StatistiqueRepositorySQL from "../../../secondaries/mysql/repositories/StatistiqueRepositorySQL";

export default class StatistiqueConfig {
  public statistiqueRepository: StatistiqueRepository = new StatistiqueRepositorySQL();

  public findNbViewsUseCase(): FindNbViewsUseCase {
    return new FindNbViewsUseCase(this.statistiqueRepository);
  }

  public findTop20BestRecipesUseCase(): FindTop20BestRecipesUseCase {
    return new FindTop20BestRecipesUseCase(this.statistiqueRepository);
  }

  public findTop20WorstRecipesUseCase(): FindTop20WorstRecipesUseCase {
    return new FindTop20WorstRecipesUseCase(this.statistiqueRepository);
  }

  public findTop20BestRecipesOfTheMonthUseCase(): FindTop20BestRecipesOfTheMonthUseCase {
    return new FindTop20BestRecipesOfTheMonthUseCase(this.statistiqueRepository);
  }

  public findNbViewsSince30DaysUseCase(): FindNbViewsSince30DaysUseCase {
    return new FindNbViewsSince30DaysUseCase(this.statistiqueRepository);
  }

  public findNbCommentairesSince30DaysUseCase(): FindNbCommentairesSince30DaysUseCase {
    return new FindNbCommentairesSince30DaysUseCase(this.statistiqueRepository);
  }

  public findNbUsersMonthlyUseCase(): FindNbUsersMonthlyUseCase {
    return new FindNbUsersMonthlyUseCase(this.statistiqueRepository);
  }

  public findNbAbonnesMonthlyUseCase(): FindNbAbonnesMonthlyUseCase {
    return new FindNbAbonnesMonthlyUseCase(this.statistiqueRepository);
  }

  public findNbAbonnesUseCase(): FindNbAbonnesUseCase {
    return new FindNbAbonnesUseCase(this.statistiqueRepository);
  }

  public findNbCommentairesUseCase(): FindNbCommentairesUseCase {
    return new FindNbCommentairesUseCase(this.statistiqueRepository);
  }

  public findNbUsersUseCase(): FindNbUsersUseCase {
    return new FindNbUsersUseCase(this.statistiqueRepository);
  }

  public findUsersXAbonnesUseCase(): FindUsersXAbonnesUseCase {
    return new FindUsersXAbonnesUseCase(this.statistiqueRepository);
  }
}
