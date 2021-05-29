import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Ingredient from "../../../../core/domain/Ingredient";
import ShoppingSequelize from "./Shopping.model";

interface IngredientModel extends Model<Ingredient>, Ingredient {}

type IngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IngredientModel;
};

function IngredientFactory(sequelize: Sequelize): IngredientStatic {
  return <IngredientStatic>sequelize.define(
    "ingredient",
    {
      idIngredient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomIngredient: {
        type: DataTypes.STRING,
      },
      lienImage: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "ingredient",
    }
  );
}

const IngredientSequelize = IngredientFactory(db.sequelize);

//association 0:N avec les ingredients
IngredientSequelize.hasMany(ShoppingSequelize, {
  foreignKey: "idIngredient",
});
ShoppingSequelize.belongsTo(IngredientSequelize, {
  foreignKey: "idIngredient",
});

export = IngredientSequelize;
