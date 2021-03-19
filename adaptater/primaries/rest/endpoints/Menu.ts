import express from "express";
const menu = express.Router();
import cors from "cors";
menu.use(cors());

import MenuConfig from "../config/MenuConfig";
const menuConfig = new MenuConfig();

//Récupérer toutes les recettes
menu.get("", (req, res) => {
  menuConfig
    .getMenuUseCase()
    .execute()
    .then((menu: any) => {
      res.json(menu);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer une des recettes du menu selon l'id
menu.get("/:id", (req, res) => {
  menuConfig
    .getMenuByIdUseCase()
    .execute(req.params.id)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Modifier une des recettes du menu selon l'id
menu.post("/:id", (req, res) => {
  menuConfig
    .updateMenuByIdUseCase()
    .execute(req.params.id, req.body.idRecette)
    .then((recipe: any) => {
      res.json(recipe);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = menu;
