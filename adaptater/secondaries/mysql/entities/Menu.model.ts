import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Menu from "../../../../core/domain/Menu";
import db from "../config/db";

export interface MenuModel extends Model<Menu>, Menu {}

export type MenuStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuModel;
};

export function MenuFactory(sequelize: Sequelize): MenuStatic {
  return <MenuStatic>sequelize.define(
    'menu',
    {
        idMenu : {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idRecette: {
            type: DataTypes.INTEGER
        }
    }
    , {
        timestamps: false
    }
  );
}

export const MenuSequelize = MenuFactory(db.sequelize);
