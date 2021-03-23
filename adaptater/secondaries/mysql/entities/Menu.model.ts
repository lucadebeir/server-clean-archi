import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Menu from "../../../../core/domain/Menu";
import db from "../config/db";

interface MenuModel extends Model<Menu>, Menu {}

type MenuStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuModel;
};

function MenuFactory(sequelize: Sequelize): MenuStatic {
  return <MenuStatic>sequelize.define(
    "menu",
    {
      idMenu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idRecette: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
}

const MenuSequelize = MenuFactory(db.sequelize);

export = MenuSequelize;
