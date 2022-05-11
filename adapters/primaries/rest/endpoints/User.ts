import express from "express";
import cors from "cors";
import sanitizeHtml from "sanitize-html";
import {authenticateJWT} from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";
import UserConfig from "../config/UserConfig";
import User from "../../../../core/domain/User";
import UserSequelize from "../../../secondaries/mysql/entities/User.model";

const user = express.Router();

user.use(cors());

const userConfig = new UserConfig();

const refreshTokenSecret = "yourrefreshtokensecrethere";
let refreshTokens: any[] = [];
let rand, mailOptions, host, link;

//Register for an user
user.post("/register", (req, res) => {
    const userData: User = {
        pseudo: sanitizeHtml(req.body.pseudo),
        email: sanitizeHtml(req.body.email),
        password: sanitizeHtml(req.body.password),
        confirmed_password: sanitizeHtml(req.body.confirmedPassword),
        is_admin: req.body.admin,
        is_subscribed: req.body.abonneNews,
    } as User;
    rand = Math.floor(Math.random() * 100 + 54);
    host = "https://" + req.get("host");
    link = host + "/users/verify?id=" + rand + "&pseudo=" + userData.pseudo;

    userConfig
        .registerUseCase()
        .execute(userData, link)
        .then((user: any) => {
            let accessToken = jwt.sign(user.dataValues, "secret", { expiresIn: "1d" });
            res.json(accessToken);
        })
        .catch((err: Error) => {
            console.log(err);
            res.json({error: err.message});
        });
});

//Google register for an user
user.post("/gregister", (req, res) => {
    const userData: User = {
        id_google: req.body.googleId,
        pseudo: sanitizeHtml(req.body.pseudo),
        email: sanitizeHtml(req.body.email),
        is_subscribed: req.body.abonneNews,
        is_admin: false
    } as User;
    rand = Math.floor(Math.random() * 100 + 54);
    link = "//" + req.get("host") + "/server/verify?id=" + rand + "&pseudo=" + userData.pseudo;

    userConfig
        .gRegisterUseCase()
        .execute(userData, link)
        .then((user: any) => {
            let accessToken = jwt.sign(user.dataValues, "secret", {
                expiresIn: "1d",
            });
            res.json(accessToken);
        })
        .catch((err: Error) => {
            console.log(err);
            res.json({error: err.message});
        });
});

//Login
user.post("/login", (req, res) => {
    userConfig
        .loginUseCase()
        .execute(sanitizeHtml(req.body.email), sanitizeHtml(req.body.password))
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
            res.json({error: err.message});
        });
});

//Google login
user.post("/glogin", (req, res) => {
    userConfig
        .gLoginUseCase()
        .execute(req.body.token)
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
            res.json({error: err.message});
        });
});

//Find an user per to his id
user.get("/profile/:pseudo", authenticateJWT, (req, res) => {
    userConfig
        .findUserByIdUseCase()
        .execute(req.params.pseudo, req.body.user)
        .then((user: any) => {
            res.json(user);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
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
            res.json({error: err.message});
        });
});

//Récupère tous les abonnés
user.get("/abonne", authenticateJWT, (req, res) => {
    userConfig
        .findAllAbonneUsersUseCase()
        .execute(req.body.user)
        .then((users: any) => {
            res.json(users);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//Récupère tous les abonnés
user.get("/abonne/mail", authenticateJWT, (req, res) => {
    userConfig
        .findAllAbonneMailUsersUseCase()
        .execute(req.body.user)
        .then((users: any) => {
            res.json(users);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//changement mdp (put pour modifier)
user.post("/password/:pseudo", authenticateJWT, (req, res) => {
    userConfig
        .updatePasswordUseCase()
        .execute(req.params.pseudo, req.body.oldPassword, req.body.newPassword,
            req.body.confirmNewPassword, req.body.user)
        .then((user: any) => {
            res.json(user);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//modifier les informations du profil d'un utilisateur
user.put("/profil/:pseudo", authenticateJWT, (req, res) => {
    const userData: User = {
        pseudo: sanitizeHtml(req.params.pseudo),
        email: sanitizeHtml(req.body.email),
        password: sanitizeHtml(req.body.mdp),
        is_admin: req.body.admin,
        is_subscribed: req.body.abonneNews,
    } as User;
    userConfig
        .updateUserUseCase()
        .execute(userData, req.body.user)
        .then((user: any) => {
            res.json(user);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
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
            res.json({error: err.message});
        });
});

//oublie du mot de passe
user.post("/req-reset-password", (req, res) => {
    userConfig
        .forgetPasswordUseCase()
        .execute(req.body.email)
        .then((user: any) => {
            res.json(user);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
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
            res.json({error: err.message});
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
            res.json({error: err.message});
        });
});

//envoie du message page contact
user.post("/contact", (req, res) => {
    userConfig
        .sendFromContactUseCase()
        .execute(req.body.email, req.body.subject, req.body.message)
        .then((user: any) => {
            res.json(user);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//renvoie tous les pseudos existants
user.get("/pseudos", (req, res) => {
    userConfig
        .findAllExistingPseudoUseCase()
        .execute()
        .then((pseudos: any) => {
            res.json(pseudos);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//renvoie tous les pseudos existants
user.get("/emails", (req, res) => {
    userConfig
        .findAllExistingEmailsUseCase()
        .execute()
        .then((emails: any) => {
            res.json(emails);
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
});

//logout
user.post("/logout", (req, res) => {
    const {token} = req.body;
    refreshTokens = refreshTokens.filter((t) => t !== token);
    res.send("Logout successful");
});

//vérifie email
user.get("/verify", (req, res) => {
    console.log(req)
    console.log(req.protocol)
    userConfig
        .verifyMailUseCase()
        .execute(req.protocol + "://" + req.get("host"), host, req.query.id, rand, req.query.pseudo)
        .then((user: any) => {
            console.log(user);
            res.redirect("https://marinesrecipes.fr/login");
        })
        .catch((err: Error) => {
            res.json({error: err.message});
        });
})

export = user;
