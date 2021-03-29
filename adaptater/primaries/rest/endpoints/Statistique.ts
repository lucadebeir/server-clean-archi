import express from "express";
const statistique = express.Router();
import cors from "cors";
statistique.use(cors());

import StatistiqueConfig from "../config/StatistiqueConfig";
const statistiqueConfig = new StatistiqueConfig();

//Récupère le nombre de vues total sur le site
statistique.get("/views", (req, res) => {
  statistiqueConfig
    .findNbViewsUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupère le nombre de commentaires total sur le site
statistique.get("/commentaires", (req, res) => {
  statistiqueConfig
    .findNbCommentairesUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer le nombre d'utilisateurs sur le site
statistique.get("/users", (req, res) => {
  statistiqueConfig
    .findNbUsersUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer le nombre d'abonnée à la newsletter
statistique.get("/abonnes", (req, res) => {
  statistiqueConfig
    .findNbAbonnesUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer les pseudo X les abonnements à la newsletter
statistique.get("/users/abonnes", (req, res) => {
  statistiqueConfig
    .findUsersXAbonnesUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer les 20 recettes les + vues du site
statistique.get("/top/recipes", (req, res) => {
  statistiqueConfig
    .findTop20BestRecipesUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer les 20 recettes les - vues du site
statistique.get("/worst/recipes", (req, res) => {
  statistiqueConfig
    .findTop20WorstRecipesUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupère les 20 recettes les + vues du mois
statistique.get("/top/recipes/month", (req, res) => {
  statistiqueConfig
    .findTop20BestRecipesOfTheMonthUseCase()
    .execute()
    .then((recipes: any) => {
      res.json(recipes);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupère le nombre de vues/jour depuis les 30 derniers jours
statistique.get("/views/month", (req, res) => {
  statistiqueConfig
    .findNbViewsSince30DaysUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupère le nombre de commentaires/jour depuis les 30 derniers jours
statistique.get("/commentaires/month", (req, res) => {
  statistiqueConfig
    .findNbCommentairesSince30DaysUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer le nombre de nouveaux users/mois sur l'année en cours
statistique.get("/users/monthly", (req, res) => {
  statistiqueConfig
    .findNbUsersMonthlyUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//Récupérer le nombre de nouveaux abonnés/mois sur l'année en cours
statistique.get("/abonnes/monthly", (req, res) => {
  statistiqueConfig
    .findNbAbonnesMonthlyUseCase()
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = statistique;
