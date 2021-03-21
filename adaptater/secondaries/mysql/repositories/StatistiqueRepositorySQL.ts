import Recipe from "../../../../core/domain/Recipe";
import User from "../../../../core/domain/User";
import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import { CommentaireSequelize } from "../entities/Commentaire.model";
import { RecipeSequelize } from "../entities/Recipe.model";
import { UserSequelize } from "../entities/User.model";

export default class StatistiqueRepositorySQL implements StatistiqueRepository {
  findNbViews(): Promise<number> {
    return RecipeSequelize.sum("nbVues")
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findNbCommentaires(): Promise<number> {
    return CommentaireSequelize.sum("idCommentaire")
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findNbUsers(): Promise<number> {
    return UserSequelize.sum("pseudo")
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findNbAbonnes(): Promise<number> {
    return UserSequelize.sum("pseudo", {
      where: {
        abonneNews: true,
      },
    })
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findUsersXAbonnes(): Promise<User[]> {
    return UserSequelize.findAll({
      attributes: ["pseudo", "abonneNews"],
    })
      .then((users) => {
        return users;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findTop20BestRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      limit: 20,
      order: [["nbVues", "DESC"]],
    })
      .then((recipes) => {
        return recipes;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findTop20WorstRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      limit: 20,
      order: [["nbVues", "ASC"]],
    })
      .then((recipes) => {
        return recipes;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findTop20BestRecipesOfTheMonth(): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  findNbViewsSince30Days(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findNbCommentairesSince30Days(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findNbUsersMonthly(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findNbAbonnesMonthly(): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
