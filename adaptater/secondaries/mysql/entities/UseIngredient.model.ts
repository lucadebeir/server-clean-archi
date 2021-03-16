import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import UseIngredient from "../../../../core/domain/UseIngredient";
import db from "../config/db";
import { IngredientSequelize } from "./Ingredient.model";
import { UnitySequelize } from "./Unity.model";

export interface UseIngredientModel extends Model<UseIngredient>, UseIngredient {};

export type UseIngredientStatic = typeof Model & {
   new (values?: object, options?: BuildOptions): UseIngredientModel;
};

export function UseIngredientFactory(sequelize: Sequelize): UseIngredientStatic {
    return <UseIngredientStatic> sequelize.define(
        'utiliserIngredients',
    {
        qte: {
            type: DataTypes.FLOAT,
          
        },
        idRecette : {
            type: DataTypes.INTEGER,
            primaryKey: true

        },
      
        idIngredient : {
            type: DataTypes.INTEGER,
            primaryKey: true

        },
        idUnite : {
            type: DataTypes.INTEGER
        }
        
    },
    {
        timestamps: false
    }
    )
};

export const UseIngredientSequelize = UseIngredientFactory(db.sequelize)

/*UseIngredientSequelize.hasOne(IngredientSequelize, {foreignKey: 'idIngredient'})
UseIngredientSequelize.hasOne(UnitySequelize, {foreignKey: 'idUnite'})*/