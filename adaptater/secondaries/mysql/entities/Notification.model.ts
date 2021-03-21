import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Notification from "../../../../core/domain/Notification";
import { RecipeSequelize } from "./Recipe.model";
import { UserSequelize } from "./User.model";

interface NotificationModel extends Model<Notification>, Notification {}

type NotificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationModel;
};

function NotificationFactory(sequelize: Sequelize): NotificationStatic {
  return <NotificationStatic>sequelize.define(
    "notification",
    {
      idNotification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.TEXT,
      },
      dateNotification: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      idRecette: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
}

const NotificationSequelize = NotificationFactory(db.sequelize);

NotificationSequelize.hasOne(RecipeSequelize, {
  foreignKey: { name: "idRecette", allowNull: false },
});
NotificationSequelize.hasOne(UserSequelize, {
  foreignKey: { name: "pseudo", allowNull: false },
});

export = NotificationSequelize;
