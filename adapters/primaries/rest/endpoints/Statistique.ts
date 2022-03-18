import express from "express";
import cors from "cors";
import StatistiqueConfig from "../config/StatistiqueConfig";
import {authenticateJWT} from "../middleware/auth.middleware";

const statistique = express.Router();
statistique.use(cors());

const statistiqueConfig = new StatistiqueConfig();

//Récupère le nombre de vues total sur le site
statistique.get("/views", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbViewsUseCase()
    .execute(req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupère le nombre de commentaires total sur le site
statistique.get("/commentaires", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbCommentairesUseCase()
    .execute(req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer le nombre d'utilisateurs sur le site
statistique.get("/users", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbUsersUseCase()
    .execute(req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer le nombre d'abonnée à la newsletter
statistique.get("/abonnes", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbAbonnesUseCase()
    .execute(req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer les pseudo X les abonnements à la newsletter
statistique.get("/users/abonnes", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findUsersXAbonnesUseCase()
    .execute(req.body.user)
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer les 20 recettes les + vues du site
statistique.get("/top/recipes", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findTop20BestRecipesUseCase()
    .execute(req.body.user)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer les 20 recettes les - vues du site
statistique.get("/worst/recipes", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findTop20WorstRecipesUseCase()
    .execute(req.body.user)
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupère les 20 recettes les + vues du mois
statistique.get("/top/recipes/month", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findTop20BestRecipesOfTheMonthUseCase()
    .execute(req.body.user)
    .then((recipes: { name: any; number_views: any }[]) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupère le nombre de vues/jour depuis les 30 derniers jours
statistique.get("/views/month", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbViewsSince30DaysUseCase()
    .execute(req.body.user)
    .then((result: { number_views: any; date: any }[]) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupère le nombre de commentaires/jour depuis les 30 derniers jours
statistique.get("/commentaires/month", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbCommentairesSince30DaysUseCase()
    .execute(req.body.user)
    .then((result: { number_commentaires: any; date: any }[]) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer le nombre de nouveaux users/mois sur l'année en cours
statistique.get("/users/monthly", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbUsersMonthlyUseCase()
    .execute(req.body.user)
    .then((result: { number_users: any; month: any }[]) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

//Récupérer le nombre de nouveaux abonnés/mois sur l'année en cours
statistique.get("/abonnes/monthly", authenticateJWT, (req, res) => {
  statistiqueConfig
    .findNbAbonnesMonthlyUseCase()
    .execute(req.body.user)
    .then((result: { number_subscribed: any; month: any }[]) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.json({ error: err.message });
    });
});

export = statistique;
