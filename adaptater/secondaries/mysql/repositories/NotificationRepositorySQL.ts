import Notification from "../../../../core/domain/Notification";
import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import NotificationSequelize from "../entities/Notification.model";

export default class NotificationRepositorySQL
  implements NotificationRepository {
  existById(id: any): Promise<boolean> {
    return NotificationSequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((result: any) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAll(): Promise<Notification[]> {
    return NotificationSequelize.findAll({
      order: [["date", "DESC"]],
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
      order: [["date", "DESC"]],
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
    return NotificationSequelize.update(
      { enabled: false },
      { where: { id: id } }
    )
      .then(() => {
        return "Notification modifiée";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
