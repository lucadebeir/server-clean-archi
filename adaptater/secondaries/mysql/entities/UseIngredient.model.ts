import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import UseIngredient from "../../../../core/domain/UseIngredient";
import db from "../config/db";
import IngredientSequelize from "./Ingredient.model";
import RecipeSequelize from "./Recipe.model";
import UnitySequelize from "./Unity.model";

interface UseIngredientModel extends Model<UseIngredient>, UseIngredient {}

type UseIngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UseIngredientModel;
};

function UseIngredientFactory(sequelize: Sequelize): UseIngredientStatic {
  return <UseIngredientStatic>sequelize.define(
    "recipes__ingredients__units",
    {
      quantity: {
        type: DataTypes.FLOAT,
      },
      id_recipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "recipes", // 'Movies' would also work
          key: "id",
        },
      },

      id_ingredient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "ingredients",
          key: "id",
        },
      },
      id_unit: {
        type: DataTypes.INTEGER,
        references: {
          model: "units",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
}

const UseIngredientSequelize = UseIngredientFactory(db.sequelize);

//association N:N entre les recettes et les ingrédients
RecipeSequelize.belongsToMany(IngredientSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_ingredient",
});
IngredientSequelize.belongsToMany(RecipeSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_recipe",
});

//association N:N entre les unités et les ingrédients
UnitySequelize.belongsToMany(IngredientSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_ingredient",
});
IngredientSequelize.belongsToMany(UnitySequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_unit",
});

//association N:N entre les recettes et les unités
RecipeSequelize.belongsToMany(UnitySequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_unit",
});
UnitySequelize.belongsToMany(RecipeSequelize, {
  through: UseIngredientSequelize,
  foreignKey: "id_recipe",
});

//association 1:N avec les recettes
UseIngredientSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "id_recipe" },
});
RecipeSequelize.hasMany(UseIngredientSequelize, {
  foreignKey: { name: "id_recipe" },
});

//association 1:N avec les ingrédients
UseIngredientSequelize.belongsTo(IngredientSequelize, {
  foreignKey: { name: "id_ingredient" },
});
IngredientSequelize.hasMany(UseIngredientSequelize, {
  foreignKey: { name: "id_ingredient" },
});

//association 1:N avec les unités
UseIngredientSequelize.belongsTo(UnitySequelize, {
  foreignKey: { name: "id_unit" },
});
UnitySequelize.hasMany(UseIngredientSequelize, {
  foreignKey: { name: "id_unit" },
});

export = UseIngredientSequelize;
