import express from "express";
const recipeList = express.Router();
import cors from "cors";
recipeList.use(cors());

import RecipeListConfig from "../config/RecipeListConfig";
const recipeListConfig = new RecipeListConfig();

//récupérer le recipeList du moment d'un utilisateur
recipeList.get("/:pseudo", (req, res) => {
  recipeListConfig
    .getRecipeListByIdUseCase()
    .execute(req.params.pseudo)
    .then((recipeList: any) => {
      res.json(recipeList);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//ajout d'une recette à la recipeList
recipeList.post("/add", (req, res) => {
  const recipeListData = {
    nomRecette: req.body.nomRecette,
    pseudoUser: req.body.pseudoUser,
    idRecette: req.body.idRecette,
  };
  recipeListConfig
    .addRecipeToRecipeListUseCase()
    .execute(recipeListData)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//update état d'une recette de la liste
recipeList.post("/update", (req, res) => {
  recipeListConfig
    .updateStateByIdUseCase()
    .execute(req.body.complet, req.body.idRecipeList, req.body.pseudoUser)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//suppression d'une recette de la liste
recipeList.delete("/delete", (req, res) => {
  recipeListConfig
    .deleteByIdUseCase()
    .execute(req.body.idRecipeList, req.body.pseudoUser)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//suppression de toutes les recettes de la liste
recipeList.delete("/delete/all", (req, res) => {
  recipeListConfig
    .deleteAllUseCase()
    .execute(req.body.pseudoUser)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = recipeList;
