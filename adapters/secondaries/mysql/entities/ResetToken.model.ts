import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import ResetToken from "../../../../core/domain/ResetToken";

interface ResetTokenModel extends Model<ResetToken>, ResetToken {}

type ResetTokenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ResetTokenModel;
};

function ResetTokenFactory(sequelize: Sequelize): ResetTokenStatic {
  return <ResetTokenStatic>sequelize.define("reset_token", {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    pseudo: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE
    }
  });
}

const ResetTokenSequelize = ResetTokenFactory(db.sequelize);

export = ResetTokenSequelize;
