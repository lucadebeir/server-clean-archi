import express from "express";
const image = express.Router();
import cors from "cors";
image.use(cors());

import ImageConfig from "../config/ImageConfig";
const imageConfig = new ImageConfig();

//Récupére une image selon son id
image.get("/:id", (req, res) => {
  imageConfig
    .findImageByIdUseCase()
    .execute(req.params.id)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupére une image selon l'id d'une recette
image.get("/recipe/:id", (req, res) => {
  imageConfig
    .findImageByRecetteUseCase()
    .execute(req.params.id)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = image;
