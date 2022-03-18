import Notification from "../../../../core/domain/Notification";
import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import NotificationSequelize from "../entities/Notification.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class NotificationRepositorySQL implements NotificationRepository {

    existById(id: any): Promise<boolean> {
        return NotificationSequelize.findOne({
            where: {
                id: id,
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findAll(): Promise<Notification[]> {
        return NotificationSequelize.findAll({
            order: [["date", "DESC"]],
        })
            .then((notifs) => {
                return notifs;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
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
                return notifs;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    create(notification: Notification): Promise<Notification> {
        return NotificationSequelize.create(notification)
            .then((notif) => {
                return notif;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    update(id: any): Promise<string> {
        return NotificationSequelize.update(
            {enabled: false},
            {where: {id: id}}
        )
            .then(() => {
                return "Notification modifiée";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

}
