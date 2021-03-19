import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Shopping from "../../../../core/domain/Shopping";

interface ShoppingModel extends Model<Shopping>, Shopping {}

type ShoppingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ShoppingModel;
};

function ShoppingFactory(sequelize: Sequelize): ShoppingStatic {
  return <ShoppingStatic>sequelize.define(
    "liste_de_course",
    {
      idIngredient: {
        type: DataTypes.INTEGER,
      },
      pseudo: {
        type: DataTypes.STRING,
      },
      idIngredientList: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      nomIngredient: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
}

export const ShoppingSequelize = ShoppingFactory(db.sequelize);
