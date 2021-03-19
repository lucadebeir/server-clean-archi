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

export = menu;