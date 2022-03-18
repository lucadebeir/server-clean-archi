import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import Unity from "../../../../core/domain/Unity";
import db from "../config/db";
import ShoppingSequelize from "./Shopping.model";

interface UnityModel extends Model<Unity>, Unity {
}

type UnityStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UnityModel;
};

function UnityFactory(sequelize: Sequelize): UnityStatic {
    return <UnityStatic>sequelize.define(
        "units",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            tableName: "units",
        }
    );
}

const UnitySequelize = UnityFactory(db.sequelize);

//association 0:N avec les ingredients
UnitySequelize.hasMany(ShoppingSequelize, {
    foreignKey: "id",
});
ShoppingSequelize.belongsTo(UnitySequelize, {
    foreignKey: "id_unit"
});

export = UnitySequelize;
