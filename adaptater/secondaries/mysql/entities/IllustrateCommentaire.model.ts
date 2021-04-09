import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import db from "../config/db";
import IllustrateCommentaireDomain from "../../../../core/domain/IllustrateCommentaire.domain";
import ImageSequelize from "./Image.model";
import CommentaireSequelize from "./Commentaire.model";

interface IllustrateCommentaireModel
  extends Model<IllustrateCommentaireDomain>,
    IllustrateCommentaireDomain {}

type IllustrateCommentaireStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IllustrateCommentaireModel;
};

function IllustrateCommentaireFactory(
  sequelize: Sequelize
): IllustrateCommentaireStatic {
  return <IllustrateCommentaireStatic>sequelize.define(
    "illustrerCommentaires",
    {
      idCommentaire: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "commentaires",
          key: "idCommentaire",
        },
      },
      idImage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "images",
          key: "idImage",
        },
      },
    },
    {
      timestamps: false,
    }
  );
}

const IllustrateCommentaireSequelize = IllustrateCommentaireFactory(
  db.sequelize
);

ImageSequelize.belongsToMany(CommentaireSequelize, {
  through: {
    model: "illustrerCommentaires",
  },
  foreignKey: "idImage",
});
CommentaireSequelize.belongsToMany(ImageSequelize, {
  through: {
    model: "illustrerCommentaires",
  },
  foreignKey: "idCommentaire",
});

IllustrateCommentaireSequelize.belongsTo(CommentaireSequelize, {
  foreignKey: { name: "idCommentaire" },
});
CommentaireSequelize.hasMany(IllustrateCommentaireSequelize, {
  foreignKey: { name: "idCommentaire" },
});

IllustrateCommentaireSequelize.belongsTo(ImageSequelize, {
  foreignKey: { name: "idImage" },
});
ImageSequelize.hasMany(IllustrateCommentaireSequelize, {
  foreignKey: { name: "idImage" },
});

export = IllustrateCommentaireSequelize;
