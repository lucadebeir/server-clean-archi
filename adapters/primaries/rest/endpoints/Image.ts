import express from "express";
import cors from "cors";
import ImageConfig from "../config/ImageConfig";
import {deleteFile, uploadImage,} from "../../../secondaries/image/helpers/Image.helpers";
import multer from "multer";
import {authenticateJWT} from "../middleware/auth.middleware";
import Image from "../../../../core/domain/Image";
import bodyParser from "body-parser";

const image = express.Router();
image.use(cors());

const imageConfig = new ImageConfig();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
image.use(bodyParser.json())
image.use(bodyParser.urlencoded({extended: false}));
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
      console.log(req.file)
    const imageUrl = await uploadImage((req as any).file);
      console.log(imageUrl)
    const data: Image = {
      link: imageUrl,
      name: (req as any)?.file?.originalname,
    };
      console.log(data)
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
