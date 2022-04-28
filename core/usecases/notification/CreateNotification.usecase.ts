import Notification from "../../domain/Notification";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class CreateNotificationUseCase {
  typeList: any[] = ["vue", "abonne", "favori", "commentaire", "user"];

  constructor(private notificationRepository: NotificationRepository, private userRepository: UserRepository,
              private recipeRepository: RecipeRepository) {}

  execute = async (notification: Notification, token?: Token): Promise<Notification> => {
    await this.checkBusinessRules(notification, token);
    return this.notificationRepository.create(notification);
  };

  private checkBusinessRules = async (notification: Notification, token?: Token): Promise<void> => {
    if (notification.pseudo) {
      if (token && isLogin(token) && token.pseudo === notification.pseudo) {
        if (!await this.userRepository.existByPseudo(notification.pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
      } else {
        throw new TechnicalException("Vous n'avez pas accès à cette ressource");
      }
    }
    if (notification.id_recipe) {
      if (await this.recipeRepository.existById(notification.id_recipe)) {
        throw new BusinessException("La recette n'existe pas");
      }
    }
    if (notification.type) {
      if (this.typeList.indexOf(notification.type) == -1) {
        throw new BusinessException("Une notification doit être de type 'vue', 'abonne', 'favori', 'user' ou 'commentaire'");
      }
    } else {
      throw new TechnicalException("Problème technique");
    }
  };
}
