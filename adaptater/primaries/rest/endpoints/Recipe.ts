import express from "express";
const recipe = express.Router();
import cors from "cors";
recipe.use(cors());

import Config from "../config/Config";
const config = new Config();

//Récupérer toutes les recettes
recipe.get("/allRecipes", (req, res) => {
  config
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
recipe.get("/allRecipes/asc", (req, res) => {
  config
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
recipe.get("/allRecipes/nbVues/desc", (req, res) => {
  config
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
  config
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
  config
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
  config
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
recipe.get("/latestRecipes", (req, res) => {
  config
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
recipe.get("/mostPopularRecipes", (req, res) => {
  config
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
