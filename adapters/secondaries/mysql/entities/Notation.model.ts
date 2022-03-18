import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import Notation from "../../../../core/domain/Notation";
import db from "../config/db";

interface NotationModel extends Model<Notation>, Notation {
}

type NotationStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): NotationModel;
};

function NotationFactory(sequelize: Sequelize): NotationStatic {
    return <NotationStatic>sequelize.define(
        "ratings",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            id_recipe: {
                type: DataTypes.INTEGER,
            },
            pseudo: {
                type: DataTypes.STRING,
            },
            note: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
}

const NotationSequelize = NotationFactory(db.sequelize);

export = NotationSequelize;
