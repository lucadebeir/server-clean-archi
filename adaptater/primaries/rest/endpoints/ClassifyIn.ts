import express from "express";
const classify = express.Router();
import cors from "cors";
classify.use(cors());

import ClassifyInConfig from "../config/ClassifyInConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const classifyInConfig = new ClassifyInConfig();

//ajouter une catégorie à une recette
classify.post("/:idRecette", authenticateJWT, (req, res) => {
  const data = {
    idRecette: req.params.idRecette,
    idCategorie: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer une recette d'une catégorie
classify.delete("/:idRecette", authenticateJWT, (req, res) => {
  const data = {
    idRecette: req.params.idRecette,
    idCategorie: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = classify;
