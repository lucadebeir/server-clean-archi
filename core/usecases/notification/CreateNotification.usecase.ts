import Notification from "../../domain/Notification";
import NotificationRepository from "../../ports/repositories/Notification.repository";

export default class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(notification: Notification): Promise<Notification> {
    return this.notificationRepository.create(notification);
  }
}
