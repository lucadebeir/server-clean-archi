import NotificationRepository from "../../../../core/ports/repositories/Notification.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateNotificationUseCase from "../../../../core/usecases/notification/CreateNotification.usecase";
import FindAllNotificationsUsecase from "../../../../core/usecases/notification/FindAllNotifications.usecase";
import FindAllNotificationsEnabledUsecase
    from "../../../../core/usecases/notification/FindAllNotificationsEnabled.usecase";
import UpdateNotificationUseCase from "../../../../core/usecases/notification/UpdateNotification.usecase";
import NotificationRepositorySQL from "../../../secondaries/mysql/repositories/NotificationRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class NotificationConfig {
  private notificationRepository: NotificationRepository = new NotificationRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();

  public getAllNotificationsUseCase(): FindAllNotificationsUsecase {
    return new FindAllNotificationsUsecase(this.notificationRepository);
  }

  public getAllNotificationsEnabledUseCase(): FindAllNotificationsEnabledUsecase {
    return new FindAllNotificationsEnabledUsecase(this.notificationRepository);
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
