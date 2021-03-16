import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Ingredient from "../../../../core/domain/Ingredient";

import { UseIngredientSequelize } from "./UseIngredient.model";


export interface IngredientModel extends Model<Ingredient>, Ingredient {};

export type IngredientStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): IngredientModel;
};

export function IngredientFactory(sequelize: Sequelize): IngredientStatic {
    return <IngredientStatic> sequelize.define(
        'ingredient',
        {
            idIngredient: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nomIngredient : {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
};

export const IngredientSequelize = IngredientFactory(db.sequelize)

/*IngredientSequelize.belongsToMany(UseIngredientSequelize, {
    through: 'utiliserIngredients',
    foreignKey : 'idIngredient'
})*/