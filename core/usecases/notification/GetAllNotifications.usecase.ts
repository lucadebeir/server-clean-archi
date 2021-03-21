import Notification from "../../domain/Notification";
import NotificationRepository from "../../ports/repositories/Notification.repository";

export default class GetAllNotificationsUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(): Promise<Notification[]> {
    return this.notificationRepository.findAll();
  }
}
