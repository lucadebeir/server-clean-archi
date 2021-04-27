import express from "express";
const shopping = express.Router();
import cors from "cors";
shopping.use(cors());

import ShoppingConfig from "../config/ShoppingConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const shoppingConfig = new ShoppingConfig();

//récupérer la liste de course de l'utilisateur
shopping.get("/:pseudo", authenticateJWT, (req, res) => {
  shoppingConfig
    .getShoppingListByIdUseCase()
    .execute(req.params.pseudo, req.body.user)
    .then((list: any) => {
      res.json(list);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//récupérer les ingrédients non présents dans la liste de course de l'utilisateur
shopping.get("/:pseudo/rest", authenticateJWT, (req, res) => {
  shoppingConfig
    .getIngredientsNotInShoppingListByIdUseCase()
    .execute(req.params.pseudo, req.body.user)
    .then((list: any) => {
      res.json(list);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//ajouter un ingrédient à la liste de course
shopping.post("/add/ingredient", authenticateJWT, (req, res) => {
  const shoppingData: any = {
    pseudo: req.body.pseudo,
    nomIngredient: req.body.nomIngredient,
  };
  shoppingConfig
    .addIngredientToShoppingList()
    .execute(shoppingData, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//ajouter les ingrédients d'une recette à la liste de course
shopping.post("/add", authenticateJWT, (req, res) => {
  shoppingConfig
    .addIngredientsOfRecipeToShoppingList()
    .execute(req.body.pseudo, req.body.listIngredients, req.body.user)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//supprimer un ingredient de la liste de course
shopping.delete("/delete/:id", authenticateJWT, (req, res) => {
  shoppingConfig
    .deleteById()
    .execute(req.params.id, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = shopping;
