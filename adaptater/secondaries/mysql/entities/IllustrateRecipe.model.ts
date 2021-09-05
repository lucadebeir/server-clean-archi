import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import IllustrateRecipeDomain from "../../../../core/domain/IllustrateRecipe.domain";
import ImageSequelize from "./Image.model";
import RecipeSequelize from "./Recipe.model";

interface IllustrateRecipeModel
  extends Model<IllustrateRecipeDomain>,
    IllustrateRecipeDomain {}

type IllustrateRecipeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IllustrateRecipeModel;
};

function IllustrateRecipeFactory(sequelize: Sequelize): IllustrateRecipeStatic {
  return <IllustrateRecipeStatic>sequelize.define(
    "recipes__images",
    {
      id_recipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "recipes",
          key: "id",
        },
      },
      id_image: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "images",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
}

const IllustrateRecipeSequelize = IllustrateRecipeFactory(db.sequelize);

ImageSequelize.belongsToMany(RecipeSequelize, {
  through: {
    model: "recipes__images",
  },
  foreignKey: "id_image",
});
RecipeSequelize.belongsToMany(ImageSequelize, {
  through: {
    model: "recipes__images",
  },
  foreignKey: "id_recipe",
});

IllustrateRecipeSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "id_recipe" },
});
RecipeSequelize.hasMany(IllustrateRecipeSequelize, {
  foreignKey: { name: "id_recipe" },
});

IllustrateRecipeSequelize.belongsTo(ImageSequelize, {
  foreignKey: { name: "id_image" },
});
ImageSequelize.hasMany(IllustrateRecipeSequelize, {
  foreignKey: { name: "id_image" },
});

export = IllustrateRecipeSequelize;
