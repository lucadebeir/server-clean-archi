import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import Commentaire from "../../../../core/domain/Commentaire";

interface CommentaireModel extends Model<Commentaire>, Commentaire {}

type CommentaireStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentaireModel;
};

function CommentaireFactory(sequelize: Sequelize): CommentaireStatic {
  return <CommentaireStatic>sequelize.define(
    "commentaires",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
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
      /*parent: {
        type: DataTypes.INTEGER,
      },*/
    },
    {
      timestamps: false,
      tableName: "commentaires",
    }
  );
}

const CommentaireSequelize = CommentaireFactory(db.sequelize);

export = CommentaireSequelize;
