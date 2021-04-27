import express from "express";
const illustrate = express.Router();
import cors from "cors";
illustrate.use(cors());

import IllustrateRecipeConfig from "../config/IllustrateRecipeConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const illustrateRecipeConfig = new IllustrateRecipeConfig();

//Ajouter une image à une recette
illustrate.get("/add", authenticateJWT, (req, res) => {
  const data: any = {
    idImage: req.body.idImage,
    idRecette: req.body.idRecette,
  };
  illustrateRecipeConfig
    .addImageToRecipeUseCase()
    .execute(data, req.body.user)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Modifier l'image d'une recette
illustrate.get("/update", authenticateJWT, (req, res) => {
  const data: any = {
    idImage: req.body.idImage,
    idRecette: req.body.idRecette,
  };
  illustrateRecipeConfig
    .updateImageFromRecipeUseCase()
    .execute(data, req.body.user)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = illustrate;
