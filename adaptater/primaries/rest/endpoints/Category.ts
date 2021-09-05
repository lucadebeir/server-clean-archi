import express from "express";
const category = express.Router();
import cors from "cors";
category.use(cors());

import CategoryConfig from "../config/CategoryConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const categoryConfig = new CategoryConfig();

//Récupére toutes les catégories
category.get("/all", (req, res) => {
  categoryConfig
    .getAllCategoriesUseCase()
    .execute()
    .then((categories: any) => {
      res.json(categories);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
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
    .catch((err: Error) => {
      res.json({ error: err.message });
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
    .catch((err: Error) => {
      res.json({ error: err.message });
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
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Ajouter catégorie
category.post("/add", authenticateJWT, (req, res) => {
  const categoryData = {
    name: req.body.libelleCategorie,
  };
  categoryConfig
    .createCategoryUseCase()
    .execute(categoryData, req.body.user)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
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
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//modifier catégorie
category.post("/update", authenticateJWT, (req, res) => {
  const categoryData = {
    id: req.body.idCategorie,
    name: req.body.libelleCategorie,
  };
  categoryConfig
    .updateCategoryUseCase()
    .execute(req.body.user, categoryData)
    .then((category: any) => {
      res.json(category);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export default category;
