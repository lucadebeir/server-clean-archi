import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Recipe from "../../../../core/domain/Recipe";
import db from "../config/db";

interface RecipeModel extends Model<Recipe>, Recipe {}

type RecipeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RecipeModel;
};

function RecipeFactory(sequelize: Sequelize): RecipeStatic {
  return <RecipeStatic>sequelize.define(
    "recettes",
    {
      idRecette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomRecette: {
        type: DataTypes.STRING,
      },

      datePublication: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      nbFavoris: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nbVues: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      etapes: {
        type: DataTypes.TEXT,
      },
      nbrePart: {
        type: DataTypes.INTEGER,
      },
      libellePart: {
        type: DataTypes.STRING,
      },
      tempsPreparation: {
        type: DataTypes.TIME,
      },
      tempsCuisson: {
        type: DataTypes.TIME,
      },
      astuce: {
        type: DataTypes.TEXT,
      },
      mot: {
        type: DataTypes.STRING,
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      timestamps: false,
    }
  );
}

export const RecipeSequelize = RecipeFactory(db.sequelize);
