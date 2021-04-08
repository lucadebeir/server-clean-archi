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
  findTop20BestRecipesOfTheMonth(): Promise<{ nomRecette: any; nbVues: any }[]>;
  findNbViewsSince30Days(): Promise<{ nbVues: any; date: any }[]>;
  findNbCommentairesSince30Days(): Promise<
    { nbCommentaires: any; date: any }[]
  >;
  findNbUsersMonthly(): Promise<{ nbUsers: any; month: any }[]>;
  findNbAbonnesMonthly(): Promise<{ nbAbonnes: any; month: any }[]>;
}
