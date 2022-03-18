import express from "express";
import cors from "cors";
import NotationConfig from "../config/NotationConfig";

const notation = express.Router();
notation.use(cors());

const notationConfig = new NotationConfig();

//Récupérer toutes les recettes
notation.post("/add", (req, res) => {
  const notationData = {
    id_recipe: req.body.id_recipe,
    pseudo: req.body.pseudo,
    note: req.body.note,
  };
  notationConfig
    .getSaveNotationUseCase()
    .execute(notationData)
    .then((notation: any) => {
      res.json(notation);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Vérifie si un utilisateur a déjà noté une recette
notation.get("/:id/:pseudo", (req, res) => {
  notationConfig
    .getFindByPseudoUseCase()
    .execute(req.params.id, req.params.pseudo)
    .then((notation: any) => {
      res.json(notation);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = notation;
