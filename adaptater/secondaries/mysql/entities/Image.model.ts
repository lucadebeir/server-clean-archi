import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import ImageDomain from "../../../../core/domain/Image.domain";

interface ImageModel extends Model<ImageDomain>, ImageDomain {}

type ImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};

function ImageFactory(sequelize: Sequelize): ImageStatic {
  return <ImageStatic>sequelize.define(
    "images",
    {
      idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lienImage: {
        type: DataTypes.STRING,
      },
      nameImage: {
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
