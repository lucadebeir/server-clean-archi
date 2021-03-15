import express from "express";
const recipe = express.Router();
import cors from "cors";
recipe.use(cors());

var Config = require("../config/Config");
var config = new Config();

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
recipe.get("/get/:id", (req, res) => {
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

//recupérer ingrédients de la recette avec l'id de la recette
recipe.get("/:id/ingredients", (req, res) => {
  config
    .getIngredientsByIdUseCase()
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
