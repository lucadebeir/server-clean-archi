import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import UseIngredient from "../../../../core/domain/UseIngredient";
import db from "../config/db";
import IngredientSequelize from "./Ingredient.model";
import RecipeSequelize from "./Recipe.model";
import { UnitySequelize } from "./Unity.model";

interface UseIngredientModel extends Model<UseIngredient>, UseIngredient {}

type UseIngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UseIngredientModel;
};

function UseIngredientFactory(sequelize: Sequelize): UseIngredientStatic {
  return <UseIngredientStatic>sequelize.define(
    "utiliserIngredients",
    {
      qte: {
        type: DataTypes.FLOAT,
      },
      idRecette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "recettes", // 'Movies' would also work
          key: "idRecette",
        },
      },

      idIngredient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "ingredient",
          key: "idIngredient",
        },
      },
      idUnite: {
        type: DataTypes.INTEGER,
        references: {
          model: "unites",
          key: "idUnite",
        },
      },
    },
    {
      timestamps: false,
    }
  );
}

const UseIngredientSequelize = UseIngredientFactory(db.sequelize);

RecipeSequelize.belongsToMany(IngredientSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idRecette",
  as: "ingredients",
});
IngredientSequelize.belongsToMany(RecipeSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idIngredient",
});
UnitySequelize.belongsToMany(IngredientSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idUnite",
});
IngredientSequelize.belongsToMany(UnitySequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idIngredient",
});
RecipeSequelize.belongsToMany(UnitySequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idRecette",
});
UnitySequelize.belongsToMany(RecipeSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "idUnite",
});

export = UseIngredientSequelize;
