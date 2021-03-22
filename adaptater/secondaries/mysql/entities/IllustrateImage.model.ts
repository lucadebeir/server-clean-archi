import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import IllustrateImageDomain from "../../../../core/domain/IllustrateImage.domain";
import ImageSequelize from "./Image.model";
import RecipeSequelize from "./Recipe.model";

interface IllustrateImageModel extends Model<IllustrateImageDomain>, IllustrateImageDomain {}

type IllustrateImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IllustrateImageModel;
};

function IllustrateImageFactory(sequelize: Sequelize): IllustrateImageStatic {
  return <IllustrateImageStatic>sequelize.define(
    'illustrerRecette',
    {
        idRecette : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "recettes",
                key: 'idRecette'
            }

        },
        idImage: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: "image",
                key: 'idImage'
            }
        }
        
    }, 
    {
        timestamps: false
    }
  );
}

const IllustrateImageSequelize = IllustrateImageFactory(db.sequelize);

RecipeSequelize.belongsToMany(ImageSequelize, {
    through: IllustrateImageSequelize, foreignKey: "idRecette", as: "images"
});
ImageSequelize.belongsToMany(RecipeSequelize, {
    through: IllustrateImageSequelize, foreignKey: "idImage"
});

export = IllustrateImageSequelize;