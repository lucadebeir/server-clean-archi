import express from "express";
const commentaire = express.Router();
import cors from "cors";
commentaire.use(cors());

import CommentaireConfig from "../config/CommentaireConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const commentaireConfig = new CommentaireConfig();

//ajout commentaire
commentaire.post("/add", authenticateJWT, (req, res) => {
  const commentaire = {
    message: req.body.message,
    dateCommentaire: new Date().toDateString(),
    ecritPar: req.body.ecritPar,
    concerne: req.body.concerne,
    parent: req.body.parent,
  };
  commentaireConfig
    .createCommentaireUseCase()
    .execute(commentaire, req.body.user)
    .then((commentaires: any) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//modifier commentaire
commentaire.post("/update", authenticateJWT, (req, res) => {
  const commentaireData = {
    idCommentaire: req.body.idCommentaire,
    message: req.body.message,
    dateCommentaire: req.body.dateCommentaire,
    ecritPar: req.body.ecritPar,
    concerne: req.body.concerne,
    parent: req.body.parent,
  };
  commentaireConfig
    .updateCommentaireUseCase()
    .execute(commentaireData, req.body.user)
    .then((commentaire: any) => {
      res.json(commentaire);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
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
      res.json({ error: err.message });
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
      res.json({ error: err.message });
    });
});

//Récupérer les commentaires d'un utilisateur
commentaire.get("/user/:pseudo", authenticateJWT, (req, res) => {
  commentaireConfig
    .getAllCommentairesByIdUser()
    .execute(req.params.pseudo, req.body.user)
    .then((commentaires) => {
      res.json(commentaires);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//supprimer un commentaire
commentaire.delete("/:id", authenticateJWT, (req, res) => {
  const commentaireData: any = {
    idCommentaire: req.params.id,
    message: req.body.message,
    dateCommentaire: req.body.dateCommentaire,
    ecritPar: req.body.ecritPar,
    concerne: req.body.concerne,
    parent: req.body.parent,
  };
  commentaireConfig
    .deleteCommentaireUseCase()
    .execute(commentaireData, req.body.user)
    .then((commentaire) => {
      res.json(commentaire);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export default commentaire;
