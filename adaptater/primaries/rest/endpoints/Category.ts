import express from "express";
const category = express.Router();
import cors from "cors";
category.use(cors());

import CategoryConfig from "../config/CategoryConfig";
const categoryConfig = new CategoryConfig();

//Récupére toutes les catégories
category.get("/all", (req, res) => {
  categoryConfig
    .getAllCategoriesUseCase()
    .execute()
    .then((categories: any) => {
      res.json(categories);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupére les recettes d'une catégorie
category.get("/:id/recipes", (req, res) => {
  categoryConfig
    .getRecipesByIdCategoryUseCase()
    .execute(req.params.id)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupére les recettes d'une catégorie selon nbVue
category.get("/:id/recipes/views", (req, res) => {
  categoryConfig
    .getRecipesByIdCategoryPerToNbViewUseCase()
    .execute(req.params.id)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Ajouter catégorie
category.post("/add", (req, res) => {
  const categoryData = {
    libelleCategorie: req.body.libelleCategorie,
  };
  categoryConfig
    .createCategoryUseCase()
    .execute(categoryData)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//supprimer catégorie
category.delete("/:id", (req, res) => {
  categoryConfig
    .deleteCategoryUseCase()
    .execute(req.params.id)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//modifier catégorie
category.post("/update", (req, res) => {
  const categoryData = {
    idCategorie: req.body.idCategorie,
    libelleCategorie: req.body.libelleCategorie,
  };
  categoryConfig
    .updateCategoryUseCase()
    .execute(categoryData)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export default category;
