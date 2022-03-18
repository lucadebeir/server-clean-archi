import express from "express";
import cors from "cors";
import FavoriConfig from "../config/FavoriConfig";
import RecipeConfig from "../config/RecipeConfig";
import {authenticateJWT} from "../middleware/auth.middleware";
import Favori from "../../../../core/domain/Favori";

const favori = express.Router();
favori.use(cors());

const favoriConfig = new FavoriConfig();
const recipeConfig = new RecipeConfig();

//ajouter aux favoris
favori.post("/add", authenticateJWT, (req, res) => {
  const favoriData = {
    id_recipe: req.body.idRecette,
    pseudo: req.body.pseudo,
  };
  favoriConfig
    .createFavoriUseCase()
    .execute(favoriData, req.body.user)
    .then((favori: any) => {
      res.json(favori);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
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
      res.json({ error: err.message });
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
      res.json({ error: err.message });
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
      res.json({ error: err.message });
    });
});

//vérifie si un utilisateur a déjà cette recette en favori
favori.get("/check/exist", authenticateJWT, (req, res) => {
  const { id, pseudo } = req.query;
  const favori = { id_recipe: id, pseudo: pseudo } as Favori;
  favoriConfig
    .checkFavoriByPseudoUseCase()
    .execute(favori, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Research
favori.post("/research/filter", authenticateJWT, (req, res) => {
  recipeConfig
    .researchFilterUseCase()
    .execute(req.body, req.body.user)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = favori;
