import express from "express";
const useIngredient = express.Router();
import cors from "cors";
useIngredient.use(cors());

import UseIngredientConfig from "../config/UseIngredientConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
import UseIngredient from "../../../../core/domain/UseIngredient";
import Unity from "../../../../core/domain/Unity";
const useIngredientConfig = new UseIngredientConfig();

//ajouter un ingrédient à une recette
useIngredient.get("/add", authenticateJWT, (req, res) => {
  const data: UseIngredient = {
    id_recipe: req.body.idRecette,
    id_ingredient: req.body.idIngredient,
    quantity: req.body.qte,
    id_unit: req.body.idUnite,
  };
  useIngredientConfig
    .addIngredientToRecipeUseCase()
    .execute(data, req.body.user)
    .then((useIngredient: any) => {
      res.json(useIngredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//modifier qte et unite d'un ingredient dans une recette
useIngredient.put(
  "/ingredient/recipe/:idRecette",
  authenticateJWT,
  (req, res) => {
    const data: UseIngredient = {
      id_recipe: parseInt(req.params.idRecette),
      id_ingredient: req.body.idIngredient,
      quantity: req.body.qte,
      id_unit: req.body.idUnite,
    };
    useIngredientConfig
      .updateIngredientFromRecipeUseCase()
      .execute(data, req.body.user)
      .then((useIngredient: any) => {
        res.json(useIngredient);
      })
      .catch((err: Error) => {
        res.json({ error: err.message });
      });
  }
);

//supprimer un ingrédient d'une recette
useIngredient.delete(
  "/:idRecette/:idIngredient",
  authenticateJWT,
  (req, res) => {
    useIngredientConfig
      .deleteIngredientFromRecipeUseCase()
      .execute(req.params.idRecette, req.params.idIngredient, req.body.user)
      .then((useIngredient: any) => {
        res.json(useIngredient);
      })
      .catch((err: Error) => {
        res.json({ error: err.message });
      });
  }
);

export = useIngredient;
