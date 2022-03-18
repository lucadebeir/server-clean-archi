import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import db from "../config/db";
import IllustrateCommentaire from "../../../../core/domain/IllustrateCommentaire";
import ImageSequelize from "./Image.model";
import CommentaireSequelize from "./Commentaire.model";

interface IllustrateCommentaireModel
  extends Model<IllustrateCommentaire>,
    IllustrateCommentaire {}

type IllustrateCommentaireStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IllustrateCommentaireModel;
};

function IllustrateCommentaireFactory(
  sequelize: Sequelize
): IllustrateCommentaireStatic {
  return <IllustrateCommentaireStatic>sequelize.define(
    "commentaires__images",
    {
      id_commentaire: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "commentaires",
          key: "id",
        },
      },
      id_image: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "images",
          key: "id",
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
    model: "commentaires__images",
  },
  foreignKey: "id",
});
CommentaireSequelize.belongsToMany(ImageSequelize, {
  through: {
    model: "commentaires__images",
  },
  foreignKey: "id",
});

IllustrateCommentaireSequelize.belongsTo(CommentaireSequelize, {
  foreignKey: { name: "id_commentaire" },
});
CommentaireSequelize.hasMany(IllustrateCommentaireSequelize, {
  foreignKey: { name: "id" },
});

IllustrateCommentaireSequelize.belongsTo(ImageSequelize, {
  foreignKey: { name: "id_image" },
});
ImageSequelize.hasMany(IllustrateCommentaireSequelize, {
  foreignKey: { name: "id" },
});

export = IllustrateCommentaireSequelize;
