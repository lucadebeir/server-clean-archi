import Notification from "../../domain/Notification";

export default interface NotificationRepository {
  findAll(): Promise<Notification[]>;
  findAllNotificationsEnabled(): Promise<Notification[]>;

  create(notification: Notification): Promise<Notification>;
  update(id: any): Promise<string>;

  existById(id: any): Promise<boolean>;
}
