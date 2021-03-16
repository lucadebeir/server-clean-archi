import express from "express";
const ingredient = express.Router();
import cors from "cors";
ingredient.use(cors());

import IngredientConfig from "../config/IngredientConfig";
const ingredientConfig = new IngredientConfig();

//Récupére toutes les catégories
ingredient.get("/all", (req, res) => {
  ingredientConfig
    .getAllIngredientsUseCase()
    .execute()
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

ingredient.get("/:id", (req, res) => {
  ingredientConfig
    .getIngredientByIdUseCase()
    .execute(req.params.id)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

ingredient.get("/rest/asc", (req, res) => {
  ingredientConfig
    .getRestOfIngredientsPerToListUseCase()
    .execute(req.body.ingredients)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

ingredient.get("/rest/recipe/:id", (req, res) => {
  ingredientConfig
    .getIngredientsNotInRecipeUseCase()
    .execute(req.params.id)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export default ingredient;
