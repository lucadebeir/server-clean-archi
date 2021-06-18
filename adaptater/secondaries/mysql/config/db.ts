import { Sequelize } from "sequelize";
import { getEnvironment } from "./environmentFile";

const environment: any = getEnvironment();

const sequelize = new Sequelize(
  environment.DB_NAME,
  environment.DB_USER,
  environment.DB_PASSWORD,
  {
    host: environment.DB_HOST,
    port: environment.PORT ? environment.PORT : null,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {
  sequelize: sequelize,
};

export = db;
