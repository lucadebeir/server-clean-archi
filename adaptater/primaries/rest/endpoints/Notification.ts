import express from "express";
const notification = express.Router();
import cors from "cors";
notification.use(cors());

import NotificationConfig from "../config/NotificationConfig";
const notificationConfig = new NotificationConfig();

//Récupére toutes les catégories
notification.get("/all", (req, res) => {
  notificationConfig
    .getAllNotificationsUseCase()
    .execute()
    .then((notifs: any) => {
      res.json(notifs);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//obtenir toutes les notifications quand enable = true
notification.get("/all/enabled", (req, res) => {
  notificationConfig
    .getAllNotificationsEnabledUseCase()
    .execute()
    .then((notifs: any) => {
      res.json(notifs);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//ajouter une notification
notification.post("/add", (req, res) => {
  notificationConfig
    .createNotificationUseCase()
    .execute(req.body)
    .then((notif: any) => {
      res.json(notif);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

//changer le statut d'une notification
notification.post("/:id", (req, res) => {
  notificationConfig
    .updateNotificationUseCase()
    .execute(req.params.id)
    .then((notif: any) => {
      res.json(notif);
    })
    .catch((err: string) => {
      res.send("error: " + err);
    });
});

export = notification;
