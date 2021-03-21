import Notification from "../../../../core/domain/Notification";
import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import NotificationSequelize from "../entities/Notification.model";

export default class NotificationRepositorySQL
  implements NotificationRepository {
  findAll(): Promise<Notification[]> {
    return NotificationSequelize.findAll({
      order: [["dateNotification", "DESC"]],
    })
      .then((notifs) => {
        if (notifs) {
          return notifs;
        } else {
          throw new Error("Il n'y a pas de notifications");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllNotificationsEnabled(): Promise<Notification[]> {
    return NotificationSequelize.findAll({
      order: [["dateNotification", "DESC"]],
      where: {
        enabled: true,
      },
    })
      .then((notifs) => {
        if (notifs) {
          return notifs;
        } else {
          throw new Error("Il n'y a pas de notifications");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  create(notification: Notification): Promise<Notification> {
    return NotificationSequelize.create(notification)
      .then((notif) => {
        if (notif) {
          return notif;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(id: any): Promise<string> {
    return NotificationSequelize.findOne({
      where: {
        idNotification: id,
      },
    })
      .then((notif) => {
        if (notif) {
          return NotificationSequelize.update(
            { enabled: false },
            { where: { idNotification: id } }
          )
            .then(() => {
              return "Notification modifiée";
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Il n'y a aucune notification avec cet identifiant");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
