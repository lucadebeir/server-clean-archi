import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import RecipeList from "../../../../core/domain/RecipeList";

interface RecipeListModel extends Model<RecipeList>, RecipeList {}

type RecipeListStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RecipeListModel;
};

function RecipeListFactory(sequelize: Sequelize): RecipeListStatic {
  return <RecipeListStatic>sequelize.define(
    "recipes_list",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_recipe: {
        type: DataTypes.STRING,
      },

      pseudo: {
        type: DataTypes.STRING,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
      },
      complete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
        tableName: 'recipes_list'
    }
  );
}

const RecipeListSequelize = RecipeListFactory(db.sequelize);

export = RecipeListSequelize;
