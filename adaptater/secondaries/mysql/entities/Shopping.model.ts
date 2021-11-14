import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Shopping from "../../../../core/domain/Shopping";
import IngredientSequelize from "./Ingredient.model";

interface ShoppingModel extends Model<Shopping>, Shopping {}

type ShoppingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ShoppingModel;
};

function ShoppingFactory(sequelize: Sequelize): ShoppingStatic {
  return <ShoppingStatic>sequelize.define(
    "shopping_list",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      id_ingredient: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: IngredientSequelize,
          key: "id",
        },
      },
      name_ingredient: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_unit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
        tableName: 'shopping_list'
    }
  );
}

const ShoppingSequelize = ShoppingFactory(db.sequelize);

export = ShoppingSequelize;
