import express from "express";
const recipe = express.Router();
import cors from "cors";
recipe.use(cors());

var Config = require("../config/Config");
var config = new Config();

recipe.get("/allRecipes", (req, res) => {
  config
    .getAllRecipeUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

recipe.get("/get/:id", (req, res) => {
  config
    .getRecipeById()
    .execute(req.params.id)
    .then((recipe: any) => {
      console.log(recipe);
      if (recipe) {
        res.json("lol");
      } else {
        res.send("Mauvais identifiant");
      }
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

/**
 * .then((recipe) => {
        console.log(recipe);
        if (recipe) {
          return recipe;
        } else {
          throw new Error("Mauvais identifiant");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
 */

export default recipe;
