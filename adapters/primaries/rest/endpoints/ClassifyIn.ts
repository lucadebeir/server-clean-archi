import express from "express";
import cors from "cors";
import ClassifyInConfig from "../config/ClassifyInConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const classify = express.Router();
classify.use(cors());

const classifyInConfig = new ClassifyInConfig();

//ajouter une catégorie à une recette
classify.post("/:idRecette", authenticateJWT, (req, res) => {
  const data = {
    id_recipe: req.params.idRecette,
    id_category: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//supprimer une recette d'une catégorie
classify.delete("/:idRecette", authenticateJWT, (req, res) => {
  const data = {
    id_recipe: req.params.idRecette,
    id_category: req.body.idCategorie,
  };
  classifyInConfig
    .addCategoryToRecipeUseCase()
    .execute(data, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = classify;
