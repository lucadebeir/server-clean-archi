import express from "express";
import cors from "cors";
import IllustrateCommentaireConfig from "../config/IllustrateCommentaireConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const illustrateCommentaire = express.Router();
illustrateCommentaire.use(cors());

const illustrateCommentaireConfig = new IllustrateCommentaireConfig();

//Ajouter une image à un commentaire
illustrateCommentaire.get("/add", authenticateJWT, (req, res) => {
  const data: any = {
    id_image: req.body.idImage,
    id_recipe: req.body.idRecette,
  };
  illustrateCommentaireConfig
    .addImageToCommentaireUseCase()
    .execute(data, req.body.user)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Modifier l'image d'un commentaire
illustrateCommentaire.get("/update", authenticateJWT, (req, res) => {
  const data: any = {
    id_image: req.body.idImage,
    id_recipe: req.body.idRecette,
  };
  illustrateCommentaireConfig
    .updateImageFromCommentaireUseCase()
    .execute(data, req.body.user)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = illustrateCommentaire;
