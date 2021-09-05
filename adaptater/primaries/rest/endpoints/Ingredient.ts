import express from "express";
const ingredient = express.Router();
import cors from "cors";
ingredient.use(cors());

import IngredientConfig from "../config/IngredientConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const ingredientConfig = new IngredientConfig();

//Récupére tous les ingrédients
ingredient.get("/all", authenticateJWT, (req, res) => {
  ingredientConfig
    .getAllIngredientsUseCase()
    .execute(req.body.user)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer toutes les infos de l'ingrédient
ingredient.get("/:id", authenticateJWT, (req, res) => {
  ingredientConfig
    .getIngredientByIdUseCase()
    .execute(req.params.id, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer tous les ingrédients restants dans l'ordre alphabétique
ingredient.get("/rest/asc", authenticateJWT, (req, res) => {
  ingredientConfig
    .getRestOfIngredientsPerToListUseCase()
    .execute(req.body.ingredients, req.body.user)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer les ingrédients qui ne sont pas utilisés dans une recette
ingredient.get("/rest/recipe/:id", authenticateJWT, (req, res) => {
  ingredientConfig
    .getIngredientsNotInRecipeUseCase()
    .execute(req.params.id, req.body.user)
    .then((ingredients: any) => {
      res.json(ingredients);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Ajouter ingredient
ingredient.post("/add", authenticateJWT, (req, res) => {
  const ingredientData = {
    name: req.body.nomIngredient,
  };
  ingredientConfig
    .createIngredientUseCase()
    .execute(ingredientData, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//supprimer ingredient
ingredient.delete("/:id", authenticateJWT, (req, res) => {
  ingredientConfig
    .deleteIngredientUseCase()
    .execute(req.params.id, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//modifier ingredient
ingredient.post("/update", authenticateJWT, (req, res) => {
  const ingredientData = {
    id: req.body.idIngredient,
    name: req.body.nomIngredient,
  };
  ingredientConfig
    .updateIngredientUseCase()
    .execute(ingredientData, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export default ingredient;
