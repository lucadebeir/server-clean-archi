import Recipe from "../../domain/Recipe";
import User from "../../domain/User";

export default interface StatistiqueRepository {
  findNbViews(): Promise<number>;
  findNbCommentaires(): Promise<number>;
  findNbUsers(): Promise<number>;
  findNbAbonnes(): Promise<number>;
  findUsersXAbonnes(): Promise<User[]>;
  findTop20BestRecipes(): Promise<Recipe[]>;
  findTop20WorstRecipes(): Promise<Recipe[]>;
  findTop20BestRecipesOfTheMonth(): Promise<any>;
  findNbViewsSince30Days(): Promise<number>;
  findNbCommentairesSince30Days(): Promise<number>;
  findNbUsersMonthly(): Promise<number>;
  findNbAbonnesMonthly(): Promise<number>;
}
