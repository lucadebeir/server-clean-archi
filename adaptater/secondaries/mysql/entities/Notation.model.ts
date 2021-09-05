import {Sequelize, DataTypes, BuildOptions, Model} from "sequelize";
import NotationDomain from "../../../../core/domain/Notation.domain";
import db from "../config/db";

interface NotationModel extends Model<NotationDomain>, NotationDomain {
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
