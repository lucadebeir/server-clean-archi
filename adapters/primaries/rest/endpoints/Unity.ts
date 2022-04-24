import express from "express";
import cors from "cors";
import UnityConfig from "../config/UnityConfig";
import {authenticateJWT} from "../middleware/auth.middleware";
import Unity from "../../../../core/domain/Unity";

const unity = express.Router();
unity.use(cors());

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
    name: req.body.name,
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
    id: req.body.id,
    name: req.body.name,
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
