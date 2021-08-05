import express from "express";
const image = express.Router();
import cors from "cors";
image.use(cors());

import ImageConfig from "../config/ImageConfig";
const imageConfig = new ImageConfig();

import {
  uploadImage,
  deleteFile,
} from "../../../secondaries/image/helpers/Image.helpers";
import multer from "multer";
import { authenticateJWT } from "../middleware/auth.middleware";
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
image.use(multerMid.single("file"));
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, `FunOfHeuristic_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//Récupére une image selon son id
image.get("/:id", (req, res) => {
  imageConfig
    .findImageByIdUseCase()
    .execute(req.params.id)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupére une image selon l'id d'une recette
image.get("/recipe/:id", (req, res) => {
  imageConfig
    .findImageByRecetteUseCase()
    .execute(req.params.id)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Télécharger une image
image.post(
  "/upload",
  upload.single("file"),
  authenticateJWT,
  async (req, res) => {
    const imageUrl = await uploadImage(req.file);
    const data = {
      lienImage: imageUrl,
      nameImage: req.file?.originalname,
    };
    imageConfig
      .uploadImageUseCase()
      .execute(data, req.body.user)
      .then((image: any) => {
        res.json(image);
      })
      .catch((err: Error) => {
        res.json({ error: err.message });
      });
  }
);

//Supprimer une image
image.post("/delete/:id", authenticateJWT, (req, res) => {
  deleteFile(req.body.name);
  imageConfig
    .deleteUseCase()
    .execute(req.params.id, req.body.user)
    .then((image: any) => {
      res.json(image);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = image;
