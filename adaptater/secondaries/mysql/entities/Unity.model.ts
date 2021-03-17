import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";
import Unity from "../../../../core/domain/Unity";
import db from "../config/db";

export interface UnityModel extends Model<Unity>, Unity {}

export type UnityStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UnityModel;
};

export function UnityFactory(sequelize: Sequelize): UnityStatic {
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

export const UnitySequelize = UnityFactory(db.sequelize);

/*UnitySequelize.belongsToMany(UseIngredientSequelize, {
    through: 'utiliserIngredients',
    foreignKey : 'idUnite'
})*/
