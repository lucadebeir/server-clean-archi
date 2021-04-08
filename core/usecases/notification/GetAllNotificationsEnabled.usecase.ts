import Notification from "../../domain/Notification";
import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllNotificationsEnabledUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(token?: TokenDomain): Promise<Notification[]> {
    this.checkBusinessRules(token);
    return this.notificationRepository.findAllNotificationsEnabled();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException("Vous n'avez pas accès à ces ressources");
    }
  }
}
