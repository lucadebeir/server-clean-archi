import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import ClassifyIn from "../../../../core/domain/ClassifyIn";
import db from "../config/db";
import CategorySequelize from "./Category.model";
import RecipeSequelize from "./Recipe.model";

interface ClassifyInModel extends Model<ClassifyIn>, ClassifyIn {}

type ClassifyInStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ClassifyInModel;
};

function ClassifyInFactory(sequelize: Sequelize): ClassifyInStatic {
  return <ClassifyInStatic>sequelize.define(
    "recipes__categories",
    {
      id_recipe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "recipes",
          key: "id",
        },
      },
      id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },

    {
      timestamps: false,
    }
  );
}

const ClassifyInSequelize = ClassifyInFactory(db.sequelize);

RecipeSequelize.belongsToMany(CategorySequelize, {
  through: ClassifyInSequelize,
  foreignKey: "id_recipe",
  otherKey: "id_category"
});
CategorySequelize.belongsToMany(RecipeSequelize, {
  through: ClassifyInSequelize,
  foreignKey: "id_category",
  otherKey: "id_recipe"
});

ClassifyInSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "id_recipe" },
});
RecipeSequelize.hasMany(ClassifyInSequelize, {
  foreignKey: { name: "id_recipe" },
});

ClassifyInSequelize.belongsTo(CategorySequelize, {
  foreignKey: { name: "id_category" },
});
CategorySequelize.hasMany(ClassifyInSequelize, {
  foreignKey: { name: "id_category" },
});

export = ClassifyInSequelize;
