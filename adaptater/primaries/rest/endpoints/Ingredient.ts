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

export default ingredient