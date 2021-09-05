import express from "express";
const recipeList = express.Router();
import cors from "cors";
recipeList.use(cors());

import RecipeListConfig from "../config/RecipeListConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
import RecipeList from "../../../../core/domain/RecipeList";
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
  const recipeListData: RecipeList = {
    name_recipe: req.body.nomRecette,
    pseudo: req.body.pseudoUser,
    id_recipe: req.body.idRecette,
    day: req.body.day,
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
  const recipeListData: RecipeList = {
    id: req.body.idRecipeList,
    name_recipe: req.body.nomRecette,
    pseudo: req.body.pseudoUser,
    id_recipe: req.body.idRecette,
    complete: req.body.complet,
    day: req.body.day,
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

//update état d'une recette de la liste
recipeList.post("/update/week", authenticateJWT, (req, res) => {
  const recipeListData: RecipeList = {
    id: req.body.idRecipeList,
    name_recipe: req.body.nomRecette,
    pseudo: req.body.pseudoUser,
    id_recipe: req.body.idRecette,
    complete: req.body.complet,
    day: req.body.day,
  };
  recipeListConfig
    .updateDayByIdUseCase()
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
    .execute(req.body.id, req.body.pseudo, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//suppression de toutes les recettes de la liste
recipeList.delete("/delete/all", authenticateJWT, (req, res) => {
  console.log(req.body);
  recipeListConfig
    .deleteAllUseCase()
    .execute(req.body.pseudo, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//vérifie si un utilisateur a déjà une recette dans sa liste de recette
recipeList.get("/check/exist", authenticateJWT, (req, res) => {
  const { id, pseudo } = req.query;
  console.log(id, pseudo);
  recipeListConfig
    .checkExistRecipeByPseudoUseCase()
    .execute(id, pseudo, req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = recipeList;
