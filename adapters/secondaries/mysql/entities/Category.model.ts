import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
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
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
}

const CategorySequelize = CategoryFactory(db.sequelize);

export = CategorySequelize;
