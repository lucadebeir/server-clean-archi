import Notification from "../../domain/Notification";
import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindAllNotificationsEnabledUsecase {
  constructor(private notificationRepository: NotificationRepository) {}

  execute = async (token?: Token): Promise<Notification[]> => {
    this.checkBusinessRules(token);
    return this.notificationRepository.findAllNotificationsEnabled();
  };

  private checkBusinessRules = (token?: Token): void => {
    if (!token || !isAdmin(token)) throw new TechnicalException("Vous n'avez pas accès à ces ressources");
  };
}
