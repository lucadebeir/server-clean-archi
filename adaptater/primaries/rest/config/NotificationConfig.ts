import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateNotificationUseCase from "../../../../core/usecases/notification/CreateNotification.usecase";
import GetAllNotificationsUseCase from "../../../../core/usecases/notification/GetAllNotifications.usecase";
import GetAllNotificationsEnabledUseCase from "../../../../core/usecases/notification/GetAllNotificationsEnabled.usecase";
import UpdateNotificationUseCase from "../../../../core/usecases/notification/UpdateNotification.usecase";
import NotificationRepositorySQL from "../../../secondaries/mysql/repositories/NotificationRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class NotificationConfig {
  public notificationRepository: NotificationRepository = new NotificationRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getAllNotificationsUseCase(): GetAllNotificationsUseCase {
    return new GetAllNotificationsUseCase(this.notificationRepository);
  }

  public getAllNotificationsEnabledUseCase(): GetAllNotificationsEnabledUseCase {
    return new GetAllNotificationsEnabledUseCase(this.notificationRepository);
  }

  public createNotificationUseCase(): CreateNotificationUseCase {
    return new CreateNotificationUseCase(
      this.notificationRepository,
      this.userRepository,
      this.recipeRepository
    );
  }

  public updateNotificationUseCase(): UpdateNotificationUseCase {
    return new UpdateNotificationUseCase(this.notificationRepository);
  }
}
