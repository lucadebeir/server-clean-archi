import express from "express";
const statistique = express.Router();
import cors from "cors";
statistique.use(cors());

import StatistiqueConfig from "../config/StatistiqueConfig";
const statistiqueConfig = new StatistiqueConfig();

//Récupére toutes les catégories
statistique.get("/views", (req, res) => {
  statistiqueConfig
    .findNbViewsUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

statistique.get("/top/recipes/month", (req, res) => {
  statistiqueConfig
    .findTop20BestRecipesOfTheMonthUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

statistique.get("/views/month", (req, res) => {
  statistiqueConfig
    .findNbViewsSince30DaysUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

statistique.get("/commentaires/month", (req, res) => {
  statistiqueConfig
    .findNbCommentairesSince30DaysUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = statistique;
