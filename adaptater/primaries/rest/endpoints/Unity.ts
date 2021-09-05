import express from "express";
const unity = express.Router();
import cors from "cors";
unity.use(cors());

import UnityConfig from "../config/UnityConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
import Unity from "../../../../core/domain/Unity";
const unityConfig = new UnityConfig();

//récupère toutes les unités
unity.get("/all", authenticateJWT, (req, res) => {
  unityConfig
    .getAllUnitiesUseCase()
    .execute(req.body.user)
    .then((unities: any) => {
      res.json(unities);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
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
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Ajouter ingredient
unity.post("/add", authenticateJWT, (req, res) => {
  const unityData: Unity = {
    name: req.body.libelleUnite,
  };
  unityConfig
    .createUnityUseCase()
    .execute(unityData, req.body.user)
    .then((unity: any) => {
      res.json(unity);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//supprimer ingredient
unity.delete("/:id", authenticateJWT, (req, res) => {
  unityConfig
    .deleteUnityUseCase()
    .execute(req.params.id, req.body.user)
    .then((unity: any) => {
      res.json(unity);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//modifier ingredient
unity.post("/update", authenticateJWT, (req, res) => {
  const unityData: Unity = {
    id: req.body.idUnite,
    name: req.body.libelleUnite,
  };
  unityConfig
    .updateUnityUseCase()
    .execute(unityData, req.body.user)
    .then((ingredient: any) => {
      res.json(ingredient);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export default unity;
