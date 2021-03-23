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
    "illustrerRecettes",
    {
      idRecette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "recettes",
          key: "idRecette",
        },
      },
      idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "images",
          key: "idImage",
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
    model: "illustrerRecettes",
  },
  foreignKey: "idImage",
});
RecipeSequelize.belongsToMany(ImageSequelize, {
  through: {
    model: "illustrerRecettes",
  },
  foreignKey: "idRecette",
});

IllustrateRecipeSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "idRecette" },
});
RecipeSequelize.hasMany(IllustrateRecipeSequelize, {
  foreignKey: { name: "idRecette" },
});

IllustrateRecipeSequelize.belongsTo(ImageSequelize, {
  foreignKey: { name: "idImage" },
});
ImageSequelize.hasMany(IllustrateRecipeSequelize, {
  foreignKey: { name: "idImage" },
});

export = IllustrateRecipeSequelize;
