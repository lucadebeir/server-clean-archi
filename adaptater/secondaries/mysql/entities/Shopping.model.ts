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
    "liste_de_course",
    {
      idIngredientList: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      idIngredient: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: IngredientSequelize,
          key: "idIngredient",
        },
      },
      nomIngredient: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      idUnite: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
}

const ShoppingSequelize = ShoppingFactory(db.sequelize);

export = ShoppingSequelize;
