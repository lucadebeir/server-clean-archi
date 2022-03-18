import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import Notification from "../../../../core/domain/Notification";

interface NotificationModel extends Model<Notification>, Notification {}

type NotificationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationModel;
};

function NotificationFactory(sequelize: Sequelize): NotificationStatic {
  return <NotificationStatic>sequelize.define(
    "notifications",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
}

const NotificationSequelize = NotificationFactory(db.sequelize);

//NotificationSequelize.belongsTo(UserSequelize);

export = NotificationSequelize;
