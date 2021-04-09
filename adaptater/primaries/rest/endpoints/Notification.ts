import express from "express";
const notification = express.Router();
import cors from "cors";
notification.use(cors());

import NotificationConfig from "../config/NotificationConfig";
import { authenticateJWT } from "../middleware/auth.middleware";
const notificationConfig = new NotificationConfig();

//Récupére toutes les catégories
notification.get("/all", authenticateJWT, (req, res) => {
  notificationConfig
    .getAllNotificationsUseCase()
    .execute(req.body.user)
    .then((notifs: any) => {
      res.json(notifs);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//obtenir toutes les notifications quand enable = true
notification.get("/all/enabled", authenticateJWT, (req, res) => {
  notificationConfig
    .getAllNotificationsEnabledUseCase()
    .execute(req.body.user)
    .then((notifs: any) => {
      res.json(notifs);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//ajouter une notification
notification.post("/add", authenticateJWT, (req, res) => {
  notificationConfig
    .createNotificationUseCase()
    .execute(req.body, req.body.user)
    .then((notif: any) => {
      res.json(notif);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

//changer le statut d'une notification
notification.post("/:id", authenticateJWT, (req, res) => {
  notificationConfig
    .updateNotificationUseCase()
    .execute(req.params.id, req.body.user)
    .then((notif: any) => {
      res.json(notif);
    })
    .catch((err: Error) => {
      res.send(err.message);
    });
});

export = notification;
