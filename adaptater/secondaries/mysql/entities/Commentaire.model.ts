import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
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
      idCommentaire: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
      },
      dateCommentaire: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ecritPar: {
        type: DataTypes.STRING,
      },
      concerne: {
        type: DataTypes.INTEGER,
      },
      parent: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: "commentaires",
    }
  );
}

const CommentaireSequelize = CommentaireFactory(db.sequelize);

export = CommentaireSequelize;
