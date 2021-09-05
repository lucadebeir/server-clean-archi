import {Sequelize, DataTypes, BuildOptions, Model} from "sequelize";
import Menu from "../../../../core/domain/Menu";
import db from "../config/db";

interface MenuModel extends Model<Menu>, Menu {
}

type MenuStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MenuModel;
};

function MenuFactory(sequelize: Sequelize): MenuStatic {
    return <MenuStatic>sequelize.define(
        "menu",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            id_recipe: {
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
