import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import Category from "../../../../core/domain/Category";

interface CategoryModel extends Model<Category>, Category {}

type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
};

function CategoryFactory(sequelize: Sequelize): CategoryStatic {
  return <CategoryStatic>sequelize.define(
    "categories",
    {
      idCategorie: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      libelleCategorie: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
}

export const CategorySequelize = CategoryFactory(db.sequelize);
