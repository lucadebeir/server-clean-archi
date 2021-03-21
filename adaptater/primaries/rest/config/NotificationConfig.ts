import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import CreateNotificationUseCase from "../../../../core/usecases/notification/CreateNotification.usecase";
import GetAllNotificationsUseCase from "../../../../core/usecases/notification/GetAllNotifications.usecase";
import GetAllNotificationsEnabledUseCase from "../../../../core/usecases/notification/GetAllNotificationsEnabled.usecase";
import UpdateNotificationUseCase from "../../../../core/usecases/notification/UpdateNotification.usecase";
import NotificationRepositorySQL from "../../../secondaries/mysql/repositories/NotificationRepositorySQL";

export default class NotificationConfig {
  public notificationRepository: NotificationRepository = new NotificationRepositorySQL();

  public getAllNotificationsUseCase(): GetAllNotificationsUseCase {
    return new GetAllNotificationsUseCase(this.notificationRepository);
  }

  public getAllNotificationsEnabledUseCase(): GetAllNotificationsEnabledUseCase {
    return new GetAllNotificationsEnabledUseCase(this.notificationRepository);
  }

  public createNotificationUseCase(): CreateNotificationUseCase {
    return new CreateNotificationUseCase(this.notificationRepository);
  }

  public updateNotificationUseCase(): UpdateNotificationUseCase {
    return new UpdateNotificationUseCase(this.notificationRepository);
  }
}
