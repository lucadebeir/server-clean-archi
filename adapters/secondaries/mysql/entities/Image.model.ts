import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import Image from "../../../../core/domain/Image";

interface ImageModel extends Model<Image>, Image {}

type ImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};

function ImageFactory(sequelize: Sequelize): ImageStatic {
  return <ImageStatic>sequelize.define(
    "images",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      link: {
        type: DataTypes.STRING,
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

const ImageSequelize = ImageFactory(db.sequelize);

export = ImageSequelize;
