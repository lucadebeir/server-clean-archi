import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Favori from "../../../../core/domain/Favori";
import db from "../config/db";

interface FavoriModel extends Model<Favori>, Favori {}

type FavoriStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FavoriModel;
};

function FavoriFactory(sequelize: Sequelize): FavoriStatic {
  return <FavoriStatic>sequelize.define(
    "favori",
    {
      pseudo: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      idRecette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
}

export const FavoriSequelize = FavoriFactory(db.sequelize);
