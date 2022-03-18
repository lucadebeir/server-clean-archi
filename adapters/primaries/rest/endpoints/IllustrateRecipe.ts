import express from "express";
import cors from "cors";
import IllustrateRecipeConfig from "../config/IllustrateRecipeConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const illustrate = express.Router();
illustrate.use(cors());

const illustrateRecipeConfig = new IllustrateRecipeConfig();

//Ajouter une image à une recette
illustrate.get("/add", authenticateJWT, (req, res) => {
  const data: any = {
    id_image: req.body.idImage,
    id_recipe: req.body.idRecette,
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
    id_image: req.body.idImage,
    id_recipe: req.body.idRecette,
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
