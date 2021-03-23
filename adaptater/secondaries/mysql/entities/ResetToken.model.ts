import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import ResetToken from "../../../../core/domain/ResetToken";

interface ResetTokenModel extends Model<ResetToken>, ResetToken {}

type ResetTokenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ResetTokenModel;
};

function ResetTokenFactory(sequelize: Sequelize): ResetTokenStatic {
  return <ResetTokenStatic>sequelize.define("resetToken", {
    userId: {
      type: DataTypes.STRING,
    },
    resettoken: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
}

const ResetTokenSequelize = ResetTokenFactory(db.sequelize);

export = ResetTokenSequelize;
