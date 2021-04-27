import express from "express";
const recipeList = express.Router();
import cors from "cors";
recipeList.use(cors());

import RecipeListConfig from "../config/RecipeListConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const recipeListConfig = new RecipeListConfig();

//récupérer le recipeList du moment d'un utilisateur
recipeList.get("/:pseudo", authenticateJWT, (req, res) => {
  recipeListConfig
    .getRecipeListByIdUseCase()
    .execute(req.params.pseudo, req.body.user)
    .then((recipeList: any) => {
      res.json(recipeList);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//ajout d'une recette à la recipeList
recipeList.post("/add", authenticateJWT, (req, res) => {
  const recipeListData = {
    nomRecette: req.body.nomRecette,
    pseudoUser: req.body.pseudoUser,
    idRecette: req.body.idRecette,
  };
  recipeListConfig
    .addRecipeToRecipeListUseCase()
    .execute(recipeListData, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//update état d'une recette de la liste
recipeList.post("/update", authenticateJWT, (req, res) => {
  const recipeListData = {
    idRecipeList: req.body.idRecipeList,
    nomRecette: req.body.nomRecette,
    pseudoUser: req.body.pseudoUser,
    idRecette: req.body.idRecette,
    complet: req.body.complet,
  };
  recipeListConfig
    .updateStateByIdUseCase()
    .execute(recipeListData, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//suppression d'une recette de la liste
recipeList.delete("/delete", authenticateJWT, (req, res) => {
  recipeListConfig
    .deleteByIdUseCase()
    .execute(req.body.idRecipeList, req.body.pseudoUser, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//suppression de toutes les recettes de la liste
recipeList.delete("/delete/all", authenticateJWT, (req, res) => {
  recipeListConfig
    .deleteAllUseCase()
    .execute(req.body.pseudoUser, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = recipeList;
