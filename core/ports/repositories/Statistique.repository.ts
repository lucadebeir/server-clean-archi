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
  findTop20BestRecipesOfTheMonth(): Promise<{ name: any; number_views: any }[]>;
  findNbViewsSince30Days(): Promise<{ number_views: any; date: any }[]>;
  findNbCommentairesSince30Days(): Promise<
    { number_commentaires: any; date: any }[]
  >;
  findNbUsersMonthly(): Promise<{ number_users: any; month: any }[]>;
  findNbAbonnesMonthly(): Promise<{ number_subscribed: any; month: any }[]>;
}
