import express from "express";
const favori = express.Router();
import cors from "cors";
favori.use(cors());

import FavoriConfig from "../config/FavoriConfig";
const favoriConfig = new FavoriConfig();

//ajouter aux favoris
favori.post("/add", (req, res) => {
  const favoriData = {
    idRecette: req.body.idRecette,
    pseudo: req.body.pseudo,
  };
  favoriConfig
    .createFavoriUseCase()
    .execute(favoriData)
    .then((favori: any) => {
      res.json(favori);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//récupérer les favoris de l'utilisateur
favori.get("/recipe/:pseudo", (req, res) => {
  favoriConfig
    .getFavorisByIdUser()
    .execute(req.params.pseudo)
    .then((favoris: any) => {
      res.json(favoris);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//récupérer les favoris de l'utilisateur selon une catégorie
favori.get("/recipe/:pseudo/category/:id", (req, res) => {
  favoriConfig
    .getFavorisByIdUserPerToCategorieUseCase()
    .execute(req.params.pseudo, req.params.id)
    .then((favoris: any) => {
      res.json(favoris);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer un favoris
favori.delete("/:id/:pseudo", (req, res) => {
  favoriConfig
    .deleteFavoriUseCase()
    .execute(req.params.id, req.params.pseudo)
    .then((favori: any) => {
      res.json(favori);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = favori;
