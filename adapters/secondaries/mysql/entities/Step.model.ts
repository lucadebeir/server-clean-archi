import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import Step from "../../../../core/domain/Step";

interface StepModel extends Model<Step>, Step {
}

type StepStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): StepModel;
};

function StepFactory(sequelize: Sequelize): StepStatic {
    return <StepStatic>sequelize.define(
        "steps",
        {
            number: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            id_recipe: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: "recipes",
                    key: "id",
                },
            },
            indication: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false
        }
    );
}

const StepSequelize = StepFactory(db.sequelize);
StepSequelize.removeAttribute('id');

export = StepSequelize;
