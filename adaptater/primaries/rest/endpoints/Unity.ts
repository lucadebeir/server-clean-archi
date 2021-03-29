import express from "express";
const unity = express.Router();
import cors from "cors";
unity.use(cors());

import UnityConfig from "../config/UnityConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const unityConfig = new UnityConfig();

//récupère toutes les unités
unity.get("/all", authenticateJWT, (req, res) => {
  unityConfig
    .getAllUnitiesUseCase()
    .execute(req.body.user)
    .then((unities: any) => {
      res.json(unities);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupérer tous les infos de l'unité
unity.get("/:id", authenticateJWT, (req, res) => {
  unityConfig
    .getUnityByIdUseCase()
    .execute(req.params.id, req.body.user)
    .then((unity: any) => {
      res.json(unity);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Ajouter ingredient
unity.post("/add", (req, res) => {
  const unityData = {
    libelleUnite: req.body.libelleUnite,
  };
  unityConfig
    .createUnityUseCase()
    .execute(unityData)
    .then((unity: any) => {
      res.json(unity);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//supprimer ingredient
unity.delete("/:id", (req, res) => {
  unityConfig
    .deleteUnityUseCase()
    .execute(req.params.id)
    .then((unity: any) => {
      res.json(unity);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//modifier ingredient
unity.post("/update", (req, res) => {
  const unityData = {
    idUnite: req.body.idUnite,
    libelleUnite: req.body.libelleUnite,
  };
  unityConfig
    .updateUnityUseCase()
    .execute(unityData)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export default unity;
