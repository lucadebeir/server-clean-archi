import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";
import Unity from "../../../../core/domain/Unity";
import db from "../config/db";

interface UnityModel extends Model<Unity>, Unity {}

type UnityStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UnityModel;
};

function UnityFactory(sequelize: Sequelize): UnityStatic {
  return <UnityStatic>sequelize.define(
    "unites",
    {
      idUnite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      libelleUnite: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "unites",
    }
  );
}

const UnitySequelize = UnityFactory(db.sequelize);

export = UnitySequelize;
