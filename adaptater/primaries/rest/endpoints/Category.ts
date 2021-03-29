import express from "express";
const category = express.Router();
import cors from "cors";
category.use(cors());

import CategoryConfig from "../config/CategoryConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const categoryConfig = new CategoryConfig();

//Récupére toutes les catégories
category.get("/all", authenticateJWT, (req, res) => {
  categoryConfig
    .getAllCategoriesUseCase()
    .execute(req.body.user)
    .then((categories: any) => {
      res.json(categories);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//selectionner les catégories dont une recette ne fait pas partie
category.get("/rest/recipes/:id", authenticateJWT, (req, res) => {
  categoryConfig
    .getCategoriesNotInRecipeUseCase()
    .execute(req.params.id, req.body.user)
    .then((categories: any) => {
      res.json(categories);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupére les recettes d'une catégorie
category.get("/:id/recipes", authenticateJWT, (req, res) => {
  categoryConfig
    .getRecipesByIdCategoryUseCase()
    .execute(req.params.id, req.body.user)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupére les recettes d'une catégorie selon nbVue
category.get("/:id/recipes/views", authenticateJWT, (req, res) => {
  categoryConfig
    .getRecipesByIdCategoryPerToNbViewUseCase()
    .execute(req.params.id, req.body.user)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Ajouter catégorie
category.post("/add", authenticateJWT, (req, res) => {
  const categoryData = {
    libelleCategorie: req.body.libelleCategorie,
  };
  categoryConfig
    .createCategoryUseCase()
    .execute(categoryData, req.body.user)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//supprimer catégorie
category.delete("/:id", authenticateJWT, (req, res) => {
  categoryConfig
    .deleteCategoryUseCase()
    .execute(req.params.id, req.body.user)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//modifier catégorie
category.post("/update", authenticateJWT, (req, res) => {
  const categoryData = {
    idCategorie: req.body.idCategorie,
    libelleCategorie: req.body.libelleCategorie,
  };
  categoryConfig
    .updateCategoryUseCase()
    .execute(req.body.user, categoryData)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export default category;
