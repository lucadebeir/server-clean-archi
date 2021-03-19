import express from "express";
const shopping = express.Router();
import cors from "cors";
shopping.use(cors());

import ShoppingConfig from "../config/ShoppingConfig";
const shoppingConfig = new ShoppingConfig();

//récupérer la liste de course de l'utilisateur
shopping.get("/:pseudo", (req, res) => {
  shoppingConfig
    .getShoppingListByIdUseCase()
    .execute(req.params.pseudo)
    .then((list: any) => {
      res.json(list);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//récupérer les ingrédients non présents dans la liste de course de l'utilisateur
shopping.get("/:pseudo/rest", (req, res) => {
  shoppingConfig
    .getIngredientsNotInShoppingListByIdUseCase()
    .execute(req.params.pseudo)
    .then((list: any) => {
      res.json(list);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//ajouter un ingrédient à la liste de course
shopping.post("/add/ingredient", (req, res) => {
  shoppingConfig
    .addIngredientToShoppingList()
    .execute(req.body.pseudo, req.body.nomIngredient)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//ajouter les ingrédients d'une recette à la liste de course
shopping.post("/add", (req, res) => {
  shoppingConfig
    .addIngredientsOfRecipeToShoppingList()
    .execute(req.body.pseudo, req.body.listIngredients)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//supprimer un ingredient de la liste de course
shopping.delete("/delete/:id/:pseudo", (req, res) => {
  shoppingConfig
    .deleteById()
    .execute(req.params.id, req.params.pseudo)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = shopping;
