import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Etape from "../../../../core/domain/Etape.domain";
import db from "../config/db";
import RecipeSequelize from "./Recipe.model";

interface EtapeModel extends Model<Etape>, Etape {}

type EtapeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EtapeModel;
};

function EtapeFactory(sequelize: Sequelize): EtapeStatic {
  return <EtapeStatic>sequelize.define(
    "steps",
    {
      id_recipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      indication: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
}

const EtapeSequelize = EtapeFactory(db.sequelize);

export = EtapeSequelize;
