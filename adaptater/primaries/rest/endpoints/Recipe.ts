import express from "express";
const recipe = express.Router();
import cors from "cors";
recipe.use(cors());

import RecipeConfig from "../config/RecipeConfig";
const recipeConfig = new RecipeConfig();

//Récupérer toutes les recettes
recipe.get("/all", (req, res) => {
  recipeConfig
    .getAllRecipeUseCase()
    .execute("desc")
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer toutes les recettes dans l'ordre alphabétique
recipe.get("/all/asc", (req, res) => {
  recipeConfig
    .getAllRecipeUseCase()
    .execute("asc")
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer toutes les recettes dans l'ordre des plus vues
recipe.get("/all/desc/views", (req, res) => {
  recipeConfig
    .getAllPerToNbViewUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer la recette depuis son identifiant
recipe.get("/:id", (req, res) => {
  recipeConfig
    .getRecipeByIdUseCase()
    .execute(req.params.id)
    .then((recipe: any) => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.send("Mauvais identifiant");
      }
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//recupérer les ingrédients d'une recette à partir de son id
recipe.get("/:id/ingredients", (req, res) => {
  recipeConfig
    .getIngredientsByIdRecipeUseCase()
    .execute(req.params.id)
    .then((ingredients: any) => {
      if (ingredients) {
        res.json(ingredients);
      } else {
        res.send("Mauvais identifiant");
      }
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//recupérer les catégories d'une recette à partir de son id
recipe.get("/:id/categories", (req, res) => {
  recipeConfig
    .getCategoriesByIdRecipeUseCase()
    .execute(req.params.id)
    .then((categories: any) => {
      if (categories) {
        res.json(categories);
      } else {
        res.send("Mauvais identifiant");
      }
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer les 3 recettes les plus récentes
recipe.get("/latest", (req, res) => {
  recipeConfig
    .getLatestRecipesUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer les 3 recettes les plus vues
recipe.get("/popular", (req, res) => {
  recipeConfig
    .getMostPopularRecipesUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export default recipe;
