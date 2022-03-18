import express from "express";
import cors from "cors";
import MenuConfig from "../config/MenuConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const menu = express.Router();
menu.use(cors());

const menuConfig = new MenuConfig();

//Récupérer toutes les recettes
menu.get("", (req, res) => {
  menuConfig
    .getMenuUseCase()
    .execute()
    .then((menu: any) => {
      res.json(menu);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer une des recettes du menu selon l'id
menu.get("/:id", authenticateJWT, (req, res) => {
  menuConfig
    .getMenuByIdUseCase()
    .execute(req.params.id, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Modifier une des recettes du menu selon l'id
menu.post("/:id", authenticateJWT, (req, res) => {
  const data: any = {
    id: req.params.id,
    id_recipe: req.body.idRecette,
  };
  menuConfig
    .updateMenuByIdUseCase()
    .execute(data, req.body.user)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = menu;
