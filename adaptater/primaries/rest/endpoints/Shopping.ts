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
    .catch((err: Error) => {
      res.send(err.message);
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
    .catch((err: Error) => {
      res.send(err.message);
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
    .catch((err: Error) => {
      res.send(err.message);
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
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer un ingredient de la liste de course
shopping.delete("/delete/:id", (req, res) => {
  shoppingConfig
    .deleteById()
    .execute(req.params.id)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = shopping;
