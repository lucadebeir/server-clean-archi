import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import {isAdmin} from "../../utils/token.service";

export default class UpdateNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  execute = async (id: any, token?: Token): Promise<string> => {
    await this.checkBusinessRules(id, token);
    return this.notificationRepository.update(id);
  };

  private checkBusinessRules = async (id: any, token?: Token): Promise<void> => {
    if (token && isAdmin(token)) {
      if (id) {
        if (!await this.notificationRepository.existById(id)) {
          throw new BusinessException("La notification n'existe pas");
        }
      } else {
        throw new BusinessException("L'identifiant d'une notification est obligatoire");
      }
    } else {
      throw new TechnicalException("Vous ne pouvez pas modifier cette ressource");
    }
  };
}
