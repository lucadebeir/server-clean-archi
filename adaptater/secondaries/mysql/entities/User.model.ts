import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import User from "../../../../core/domain/User";
import NotationSequelize from "./Notation.model";

interface UserModel extends Model<User>, User {}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define(
    "user",
    {
      pseudo: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      googleId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
      },
      emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      mdp: {
        type: DataTypes.STRING,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      abonneNews: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
}

const UserSequelize = UserFactory(db.sequelize);

//association 0:N avec les notations
NotationSequelize.belongsTo(UserSequelize, {
  foreignKey: { name: "pseudo" },
});
UserSequelize.hasMany(NotationSequelize, {
  foreignKey: { name: "pseudo" },
});

export = UserSequelize;
