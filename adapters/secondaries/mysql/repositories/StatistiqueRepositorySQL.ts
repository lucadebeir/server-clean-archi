import {col, fn, literal, Op} from "sequelize";
import Recipe from "../../../../core/domain/Recipe";
import User from "../../../../core/domain/User";
import StatistiqueRepository from "../../../../core/ports/repositories/Statistique.repository";
import CommentaireSequelize from "../entities/Commentaire.model";
import NotificationSequelize from "../entities/Notification.model";
import RecipeSequelize from "../entities/Recipe.model";
import UserSequelize from "../entities/User.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class StatistiqueRepositorySQL implements StatistiqueRepository {
  findNbViews(): Promise<number> {
    return RecipeSequelize.sum("number_views")
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbCommentaires(): Promise<number> {
    return CommentaireSequelize.count()
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbUsers(): Promise<number> {
    return UserSequelize.count()
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbAbonnes(): Promise<number> {
    return UserSequelize.count({
      where: {
        is_subscribed: true,
      },
    })
      .then((resultat) => {
        return resultat;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findUsersXAbonnes(): Promise<User[]> {
    return UserSequelize.findAll({
      attributes: ["pseudo", "is_subscribed"],
    })
      .then((users) => {
        return users;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findTop20BestRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      limit: 20,
      order: [["number_views", "DESC"]],
    })
      .then((recipes) => {
        return recipes;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findTop20WorstRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      limit: 20,
      order: [["number_views", "ASC"]],
    })
      .then((recipes) => {
        return recipes;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findTop20BestRecipesOfTheMonth(): Promise<
    { name: any; number_views: any }[]
  > {
    return RecipeSequelize.findAll({
      attributes: {
        include: [
          "name",
          [fn("COUNT", col("notifications.id")), "number_views"],
        ],
        exclude: [
          "id",
          "number_favoris",
          "date",
          "steps",
          "number_portion",
          "name_portion",
          "preparation_time",
          "preparation_rest",
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
            [Op.and]: literal(`date > NOW() - INTERVAL 1 MONTH`),
          },
          duplicating: false,
          required: false,
        },
      ],
      order: literal("number_views DESC"),
      group: "id",
      limit: 20,
    })
      .then((resultat: any) => {
        return resultat;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbViewsSince30Days(): Promise<{ number_views: any; date: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "number_views"],
          [fn("DATE", col("date")), "date"],
        ],
        exclude: [
          `id`,
          `type`,
          `pseudo`,
          `id_recipe`,
          `enabled`,
          `date`,
        ],
      },
      where: {
        [Op.and]: literal(`date > NOW() - INTERVAL 1 MONTH`),
        type: "vue",
      },
      group: "date",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbCommentairesSince30Days(): Promise<
    { number_commentaires: any; date: any }[]
  > {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "number_commentaires"],
          [fn("DATE", col("date")), "date"],
        ],
        exclude: [
          `id`,
          `type`,
          `pseudo`,
          `id_recipe`,
          `enabled`,
          `date`,
        ],
      },
      where: {
        [Op.and]: literal(`date > NOW() - INTERVAL 1 MONTH`),
        type: "commentaire",
      },
      group: "date",
    })
      .then((result: any) => {
        return result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findNbUsersMonthly(): Promise<{ number_users: any; month: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "number_users"],
          [fn("MONTH", col("date")), "month"],
        ],
        exclude: [
          `id`,
          `type`,
          `pseudo`,
          `id_recipe`,
          `enabled`,
          `date`,
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
        throw new TechnicalException(err.message);
      });
  }

  findNbAbonnesMonthly(): Promise<{ number_subscribed: any; month: any }[]> {
    return NotificationSequelize.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("*")), "number_subscribed"],
          [fn("MONTH", col("date")), "month"],
        ],
        exclude: [
          `id`,
          `type`,
          `pseudo`,
          `id_recipe`,
          `enabled`,
          `date`,
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
        throw new TechnicalException(err.message);
      });
  }
}
