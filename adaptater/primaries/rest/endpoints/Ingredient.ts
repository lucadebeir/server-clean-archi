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
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer tous les infos de l'ingrédient
ingredient.get("/:id", (req, res) => {
  ingredientConfig
    .getIngredientByIdUseCase()
    .execute(req.params.id)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer tous les ingrédients restants dans l'ordre alphabétique
ingredient.get("/rest/asc", (req, res) => {
  ingredientConfig
    .getRestOfIngredientsPerToListUseCase()
    .execute(req.body.ingredients)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer les ingrédients qui ne sont pas utilisés dans une recette
ingredient.get("/rest/recipe/:id", (req, res) => {
  ingredientConfig
    .getIngredientsNotInRecipeUseCase()
    .execute(req.params.id)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Ajouter ingredient
ingredient.post("/add", (req, res) => {
  const ingredientData = {
    nomIngredient: req.body.nomIngredient,
  };
  ingredientConfig
    .createIngredientUseCase()
    .execute(ingredientData)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer ingredient
ingredient.delete("/:id", (req, res) => {
  ingredientConfig
    .deleteIngredientUseCase()
    .execute(req.params.id)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//modifier ingredient
ingredient.post("/update", (req, res) => {
  const ingredientData = {
    idIngredient: req.body.idIngredient,
    nomIngredient: req.body.nomIngredient,
  };
  ingredientConfig
    .updateIngredientUseCase()
    .execute(ingredientData)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export default ingredient;
