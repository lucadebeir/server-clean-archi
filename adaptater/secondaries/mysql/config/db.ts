import { Sequelize } from "sequelize";
import { getEnvironment } from "./environmentFile";

const environment: any = getEnvironment();

const sequelize = new Sequelize(
  "marinesrecipes_bd",
  "201428",
  "Luka-12021996",
  {
    host: "mysql-marinesrecipes.alwaysdata.net",
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
