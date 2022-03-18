import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import Favori from "../../../../core/domain/Favori";
import db from "../config/db";

interface FavoriModel extends Model<Favori>, Favori {}

type FavoriStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FavoriModel;
};

function FavoriFactory(sequelize: Sequelize): FavoriStatic {
  return <FavoriStatic>sequelize.define(
    "favorites",
    {
      pseudo: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
}

const FavoriSequelize = FavoriFactory(db.sequelize);

export = FavoriSequelize;
