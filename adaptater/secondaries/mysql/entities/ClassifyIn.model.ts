import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
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
    'classerDans',
    {
        idRecette: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "recettes",
                key: 'idRecette'
            }
        },
        idCategorie : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "categories",
                key: 'idCategorie'
            }
        }
    },
    
    {
        timestamps: false
    }
  );
}

const ClassifyInSequelize = ClassifyInFactory(db.sequelize);

RecipeSequelize.belongsToMany(CategorySequelize, {
    through: ClassifyInSequelize, foreignKey: "idRecette", as: "categories"
});
CategorySequelize.belongsToMany(RecipeSequelize, {
    through: ClassifyInSequelize, foreignKey: "idCategorie"
});

export = ClassifyInSequelize;