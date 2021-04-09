import express from "express";
const user = express.Router();
import cors from "cors";
import sanitizeHtml from "sanitize-html";
import { authenticateJWT } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";
user.use(cors());

import UserConfig from "../config/UserConfig";
const userConfig = new UserConfig();

const refreshTokenSecret = "yourrefreshtokensecrethere";
let refreshTokens: any[] = [];

//Register for an user
user.post("/register", (req, res) => {
  const userData = {
    pseudo: sanitizeHtml(req.body.pseudo),
    email: sanitizeHtml(req.body.email),
    mdp: sanitizeHtml(req.body.mdp),
    mdp2: sanitizeHtml(req.body.mdp2),
    admin: req.body.admin,
    abonneNews: req.body.abonneNews,
  };
  const rand = Math.floor(Math.random() * 100 + 54);
  const link =
    "http://" +
    req.get("host") +
    "/server/verify?id=" +
    rand +
    "&pseudo=" +
    userData.pseudo;

  userConfig
    .registerUseCase()
    .execute(userData, link)
    .then((user: any) => {
      let accessToken = jwt.sign(user.dataValues, "secret", {
        expiresIn: "1d",
      });
      res.json(accessToken);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Login
user.post("/login", (req, res) => {
  userConfig
    .loginUseCase()
    .execute(sanitizeHtml(req.body.pseudo), sanitizeHtml(req.body.mdp))
    .then((user: any) => {
      let accessToken = jwt.sign(user.dataValues, "secret", {
        expiresIn: "1d",
      });
      let refreshToken = jwt.sign(user.dataValues, refreshTokenSecret);
      refreshTokens.push(refreshToken);

      res.json({
        accessToken,
        refreshToken,
      });
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Find an user per to his id
user.get("/profile", authenticateJWT, (req, res) => {
  userConfig
    .getUserByIdUseCase()
    .execute(sanitizeHtml(req.body.pseudo), req.body.user)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Check l'unicité d'un pseudo
user.get("/pseudo/:pseudo", (req, res) => {
  userConfig
    .existByPseudoUseCase()
    .execute(req.params.pseudo)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupère tous les abonnés
user.get("/abonne", authenticateJWT, (req, res) => {
  userConfig
    .getAllAbonneUsersUseCase()
    .execute()
    .then((users: any) => {
      res.json(users);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//changement mdp (put pour modifier)
user.put("/password/:pseudo", authenticateJWT, (req, res) => {
  userConfig
    .updatePasswordUseCase()
    .execute(
      req.params.pseudo,
      req.body.mdp,
      req.body.newmdp,
      req.body.mdp2,
      req.body.user
    )
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//modifier les informations du profil d'un utilisateur
user.put("/profil/:pseudo", authenticateJWT, (req, res) => {
  const userData = {
    pseudo: sanitizeHtml(req.params.pseudo),
    email: sanitizeHtml(req.body.email),
    mdp: sanitizeHtml(req.body.mdp),
    mdp2: sanitizeHtml(req.body.mdp2),
    admin: req.body.admin,
    abonneNews: req.body.abonneNews,
  };
  userConfig
    .updateUserUseCase()
    .execute(userData, req.body.user)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//supprimer un compte selon le pseudo d'un utilisateur
user.delete("/:pseudo", authenticateJWT, (req, res) => {
  userConfig
    .deleteUserUseCase()
    .execute(req.params.pseudo, req.body.user)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//check du token pour changement de mot de passe
user.post("/valid-password-token", (req, res) => {
  userConfig
    .checkValideTokenUseCase()
    .execute(req.body.resettoken)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//changement de mdp après envoie du mail
user.post("/new-password", (req, res) => {
  userConfig
    .updatePasswordWithTokenUseCase()
    .execute(req.body.resettoken, req.body.newPassword)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//renvoie tous les pseudos existants
user.get("/pseudos", (req, res) => {
  userConfig
    .getAllExistingPseudoUseCase()
    .execute()
    .then((pseudos: any) => {
      res.json(pseudos);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//renvoie tous les pseudos existants
user.get("/emails", (req, res) => {
  userConfig
    .getAllExistingEmailsUseCase()
    .execute()
    .then((emails: any) => {
      res.json(emails);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//logout
user.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.send("Logout successful");
});

export = user;
