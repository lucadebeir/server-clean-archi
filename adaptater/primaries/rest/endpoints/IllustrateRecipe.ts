import express from "express";
const illustrate = express.Router();
import cors from "cors";
illustrate.use(cors());

import IllustrateRecipeConfig from "../config/IllustrateRecipeConfig";
const illustrateRecipeConfig = new IllustrateRecipeConfig();

//Récupére une image selon son id
illustrate.get("/add", (req, res) => {
  illustrateRecipeConfig
    .addImageToRecipeUseCase()
    .execute(req.body.idImage, req.body.idRecette)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupére une image selon l'id d'une recette
illustrate.get("/update", (req, res) => {
  illustrateRecipeConfig
    .updateImageFromRecipeUseCase()
    .execute(req.body.idImage, req.body.idRecette)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = illustrate;
