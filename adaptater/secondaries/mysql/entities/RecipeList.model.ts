import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import RecipeList from "../../../../core/domain/RecipeList";

interface RecipeListModel extends Model<RecipeList>, RecipeList {}

type RecipeListStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RecipeListModel;
};

function RecipeListFactory(sequelize: Sequelize): RecipeListStatic {
  return <RecipeListStatic>sequelize.define(
    "recipeList",
    {
      idRecipeList: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomRecette: {
        type: DataTypes.STRING,
      },

      pseudoUser: {
        type: DataTypes.STRING,
      },
      idRecette: {
        type: DataTypes.INTEGER,
      },
      complet: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
}

const RecipeListSequelize = RecipeListFactory(db.sequelize);

export = RecipeListSequelize;
