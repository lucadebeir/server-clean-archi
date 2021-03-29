import express from "express";
const commentaire = express.Router();
import cors from "cors";
commentaire.use(cors());

import CommentaireConfig from "../config/CommentaireConfig";
const commentaireConfig = new CommentaireConfig();

//ajout commentaire
commentaire.post("/add", (req, res) => {
  const commentaire = {
    message: req.body.message,
    dateCommentaire: new Date().toDateString(),
    ecritPar: req.body.ecritPar,
    concerne: req.body.concerne,
    parent: req.body.parent,
  };
  commentaireConfig
    .createCommentaireUseCase()
    .execute(commentaire)
    .then((commentaires: any) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//modifier commentaire
commentaire.post("/update", (req, res) => {
  const commentaireData = {
    message: req.body.message,
    dateCommentaire: req.body.dateCommentaire,
    ecritPar: req.body.ecritPar,
    concerne: req.body.concerne,
    parent: req.body.parent,
  };
  commentaireConfig
    .updateCommentaireUseCase()
    .execute(commentaireData)
    .then((commentaire: any) => {
      res.json(commentaire);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer tous les commentaires d'une recette
commentaire.get("/recipe/:id", (req, res) => {
  commentaireConfig
    .getAllCommentairesByIdRecipe()
    .execute(req.params.id)
    .then((commentaires) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer tous les commentaires fils d'un commentaire d'une recette
commentaire.get("/recipe/:id/reponse/:idCommentaire", (req, res) => {
  commentaireConfig
    .getAllChildrenCommentairesByIdRecipe()
    .execute(req.params.id, req.params.idCommentaire)
    .then((commentaires) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer les commentaires d'un utilisateur
commentaire.get("/user/:pseudo", (req, res) => {
  commentaireConfig
    .getAllCommentairesByIdUser()
    .execute(req.params.pseudo)
    .then((commentaires) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer un commentaire
commentaire.delete("/:id", (req, res) => {
  commentaireConfig
    .deleteCommentaireUseCase()
    .execute(req.params.id)
    .then((commentaire) => {
      res.json(commentaire);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export default commentaire;
