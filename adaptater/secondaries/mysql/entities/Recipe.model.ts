import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import Recipe from "../../../../core/domain/Recipe";
import db from "../config/db";
import EtapeSequelize from "./Etape.model";
import FavoriSequelize from "./Favori.model";
import MenuSequelize from "./Menu.model";
import NotificationSequelize from "./Notification.model";

interface RecipeModel extends Model<Recipe>, Recipe {}

type RecipeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RecipeModel;
};

function RecipeFactory(sequelize: Sequelize): RecipeStatic {
  return <RecipeStatic>sequelize.define(
    "recettes",
    {
      idRecette: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomRecette: {
        type: DataTypes.STRING,
      },

      datePublication: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      nbFavoris: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nbVues: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nbrePart: {
        type: DataTypes.INTEGER,
      },
      libellePart: {
        type: DataTypes.STRING,
      },
      tempsPreparation: {
        type: DataTypes.TIME,
      },
      tempsCuisson: {
        type: DataTypes.TIME,
      },
      astuce: {
        type: DataTypes.TEXT,
      },
      mot: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: "recettes",
    }
  );
}

const RecipeSequelize = RecipeFactory(db.sequelize);

//association 0:N avec les notifications
NotificationSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "idRecette" },
});
RecipeSequelize.hasMany(NotificationSequelize, {
  foreignKey: { name: "idRecette" },
});

//association 0:N avec les favoris
FavoriSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "idRecette" },
});
RecipeSequelize.hasMany(FavoriSequelize, {
  foreignKey: { name: "idRecette" },
});

//association 0:N avec le menu
MenuSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "idRecette" },
});
RecipeSequelize.hasMany(MenuSequelize, {
  foreignKey: { name: "idRecette" },
});

//association 0:N avec les etapes
EtapeSequelize.belongsTo(RecipeSequelize, {
  foreignKey: { name: "idRecette" },
});
RecipeSequelize.hasMany(EtapeSequelize, {
  foreignKey: { name: "idRecette" },
});

export = RecipeSequelize;
