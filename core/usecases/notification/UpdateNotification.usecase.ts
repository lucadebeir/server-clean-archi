import Notification from "../../domain/Notification";
import NotificationRepository from "../../ports/repositories/Notification.repository";

export default class UpdateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(id: any): Promise<Notification> {
    return this.notificationRepository.update(id);
  }
}
