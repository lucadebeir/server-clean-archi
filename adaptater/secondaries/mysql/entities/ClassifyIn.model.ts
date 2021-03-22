import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import ClassifyIn from "../../../../core/domain/ClassifyIn";
import db from "../config/db";

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
            primaryKey: true
        },
        idCategorie : {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    
    {
        timestamps: false
    }
  );
}

export const ClassifyInSequelize = ClassifyInFactory(db.sequelize);
