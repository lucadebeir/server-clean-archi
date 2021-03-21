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

export = statistique;
