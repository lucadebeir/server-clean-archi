import express from "express";
const classify = express.Router();
import cors from "cors";
classify.use(cors());

import ClassifyInConfig from "../config/ClassifyInConfig";
const classifyInConfig = new ClassifyInConfig();

//ajouter une catégorie à une recette
classify.post("/:idRecette", (req, res) => {
  const data = {
    idRecette: req.params.idRecette,
    idCategorie: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer une recette d'une catégorie
classify.delete("/:idRecette", (req, res) => {
  const data = {
    idRecette: req.params.idRecette,
    idCategorie: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = classify;
