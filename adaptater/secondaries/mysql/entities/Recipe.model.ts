import Sequelize from "sequelize";
import db from "../config/db";

export const RecipeSequelize = db.sequelize.define(
  "recettes",
  {
    idRecette: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomRecette: {
      type: Sequelize.STRING,
    },

    datePublication: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    nbFavoris: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    nbVues: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    etapes: {
      type: Sequelize.TEXT,
    },
    nbrePart: {
      type: Sequelize.INTEGER,
    },
    libellePart: {
      type: Sequelize.STRING,
    },
    tempsPreparation: {
      type: Sequelize.TIME,
    },
    tempsCuisson: {
      type: Sequelize.TIME,
    },
    astuce: {
      type: Sequelize.TEXT,
    },
    mot: {
      type: Sequelize.STRING,
    },
    categories: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
    },
  },
  {
    timestamps: false,
  }
);
