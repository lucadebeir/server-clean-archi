import express from "express";
const user = express.Router();
import cors from "cors";
import sanitizeHtml from "sanitize-html";
user.use(cors());

import UserConfig from "../config/UserConfig";
const userConfig = new UserConfig();

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
  userConfig
    .registerUseCase()
    .execute(userData, req.get("host"))
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Login
user.post("/login", (req, res) => {
  userConfig
    .loginUseCase()
    .execute(sanitizeHtml(req.body.pseudo), sanitizeHtml(req.body.mdp))
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Find an user per to his id
user.get("/profile", (req, res) => {
  userConfig
    .getUserByIdUseCase()
    .execute(sanitizeHtml(req.body.pseudo))
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
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
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//Récupère tous les abonnés
user.get("/abonne", (req, res) => {
  userConfig
    .getAllAbonneUsersUseCase()
    .execute()
    .then((users: any) => {
      res.json(users);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//changement mdp (put pour modifier)
user.put("/password/:pseudo", (req, res) => {
  userConfig
    .updatePasswordUseCase()
    .execute(req.params.pseudo, req.body.mdp, req.body.newmdp, req.body.mdp2)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//modifier les informations du profil d'un utilisateur
user.put("/profil/:pseudo", (req, res) => {
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
    .execute(userData)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//supprimer un compte selon le pseudo d'un utilisateur
user.delete("/:pseudo", (req, res) => {
  userConfig
    .deleteUserUseCase()
    .execute(req.params.pseudo)
    .then((user: any) => {
      res.json(user);
    })
    .catch((err: string) => {
      res.send("error: " + err);
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
    .catch((err: string) => {
      res.send("error: " + err);
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
    .catch((err: string) => {
      res.send("error: " + err);
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
    .catch((err: string) => {
      res.send("error: " + err);
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
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = user;
