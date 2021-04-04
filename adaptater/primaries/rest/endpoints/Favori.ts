import express from "express";
const favori = express.Router();
import cors from "cors";
favori.use(cors());

import FavoriConfig from "../config/FavoriConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const favoriConfig = new FavoriConfig();

//ajouter aux favoris
favori.post("/add", authenticateJWT, (req, res) => {
  const favoriData = {
    idRecette: req.body.idRecette,
    pseudo: req.body.pseudo,
  };
  favoriConfig
    .createFavoriUseCase()
    .execute(favoriData, req.body.user)
    .then((favori: any) => {
      res.json(favori);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//récupérer les favoris de l'utilisateur
favori.get("/recipe/:pseudo", authenticateJWT, (req, res) => {
  favoriConfig
    .getFavorisByIdUser()
    .execute(req.params.pseudo, req.body.user)
    .then((favoris: any) => {
      res.json(favoris);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//récupérer les favoris de l'utilisateur selon une catégorie
favori.get("/recipe/:pseudo/category/:id", authenticateJWT, (req, res) => {
  favoriConfig
    .getFavorisByIdUserPerToCategoryUseCase()
    .execute(req.params.pseudo, req.params.id, req.body.user)
    .then((favoris: any) => {
      res.json(favoris);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer un favoris
favori.delete("/:id/:pseudo", authenticateJWT, (req, res) => {
  favoriConfig
    .deleteFavoriUseCase()
    .execute(req.params.id, req.params.pseudo, req.body.user)
    .then((favori: any) => {
      res.json(favori);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = favori;
