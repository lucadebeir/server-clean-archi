import { fn, col, literal, DataTypes, Op } from "sequelize";
import Recipe from "../../../../core/domain/Recipe";
import User from "../../../../core/domain/User";
import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import CommentaireSequelize from "../entities/Commentaire.model";
import NotificationSequelize from "../entities/Notification.model";
import RecipeSequelize from "../entities/Recipe.model";
import UserSequelize from "../entities/User.model";

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
    return CommentaireSequelize.count()
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findNbUsers(): Promise<number> {
    return UserSequelize.count()
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findNbAbonnes(): Promise<number> {
    return UserSequelize.count({
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

  findTop20BestRecipesOfTheMonth(): Promise<
    { nomRecette: any; nbVues: any }[]
  > {
    return RecipeSequelize.findAll({
      attributes: {
        include: [
          "nomRecette",
          [fn("COUNT", col("notifications.idNotification")), "nbVues"],
        ],
        exclude: [
          "idRecette",
          "nbFavoris",
          "datePublication",
          "etapes",
          "nbrePart",
          "libellePart",
          "tempsPreparation",
          "tempsCuisson",
          "astuce",
          "mot",
        ],
      },
      include: [
        {
          model: NotificationSequelize,
          attributes: [],
          where: {
            type: "vue",
            [Op.and]: literal(`dateNotification > NOW() - INTERVAL 1 MONTH`),
          },
          duplicating: false,
          required: false,
        },
      ],
      order: literal("nbVues DESC"),
      group: "idRecette",
      limit: 20,
    })
      .then((resultat: any) => {
        return resultat;
      })
      .catch((err) => {
        return "error: " + err;
      });
  }

  findNbViewsSince30Days(): Promise<{ nbVues: any; date: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "nbVues"],
          [fn("DATE", col("dateNotification")), "date"],
        ],
        exclude: [
          `idNotification`,
          `type`,
          `pseudo`,
          `idRecette`,
          `enabled`,
          `dateNotification`,
        ],
      },
      where: {
        [Op.and]: literal(`dateNotification > NOW() - INTERVAL 1 MONTH`),
        type: "vue",
      },
      group: "date",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        return "error: " + err;
      });
  }

  findNbCommentairesSince30Days(): Promise<
    { nbCommentaires: any; date: any }[]
  > {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "nbCommentaires"],
          [fn("DATE", col("dateNotification")), "date"],
        ],
        exclude: [
          `idNotification`,
          `type`,
          `pseudo`,
          `idRecette`,
          `enabled`,
          `dateNotification`,
        ],
      },
      where: {
        [Op.and]: literal(`dateNotification > NOW() - INTERVAL 1 MONTH`),
        type: "commentaire",
      },
      group: "date",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        return "error: " + err;
      });
  }

  findNbUsersMonthly(): Promise<{ nbUsers: any; month: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "nbUsers"],
          [fn("MONTH", col("dateNotification")), "month"],
        ],
        exclude: [
          `idNotification`,
          `type`,
          `pseudo`,
          `idRecette`,
          `enabled`,
          `dateNotification`,
        ],
      },
      where: {
        type: "user",
      },
      group: "month",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        return "error: " + err;
      });
  }

  findNbAbonnesMonthly(): Promise<{ nbAbonnes: any; month: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "nbAbonnes"],
          [fn("MONTH", col("dateNotification")), "month"],
        ],
        exclude: [
          `idNotification`,
          `type`,
          `pseudo`,
          `idRecette`,
          `enabled`,
          `dateNotification`,
        ],
      },
      where: {
        type: "abonne",
      },
      group: "month",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        return "error: " + err;
      });
  }
}
