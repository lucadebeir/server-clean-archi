import Notification from "../../domain/Notification";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isLogin } from "../../utils/token.service";

export default class CreateNotificationUseCase {
  typeList: any[] = ["vue", "abonne", "favori", "commentaire"];

  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
    private recipeRepository: RecipeRepository
  ) {}

  async execute(
    notification: Notification,
    token?: TokenDomain
  ): Promise<Notification> {
    this.checkBusinessRules(notification, token);
    return this.notificationRepository.create(notification);
  }

  private checkBusinessRules(
    notification: Notification,
    token?: TokenDomain
  ): void {
    if (notification.pseudo) {
      if (token && isLogin(token) && token.pseudo === notification.pseudo) {
        if (!this.userRepository.existByPseudo(notification.pseudo)) {
          throw new BusinessException("L'utilisateur n'existe pas");
        }
      } else {
        throw new TechnicalException("Vous n'avez pas accès à cette ressource");
      }
    }
    if (notification.idRecette) {
      if (this.recipeRepository.existById(notification.idRecette)) {
        throw new BusinessException("La recette n'existe pas");
      }
    }
    if (notification.type) {
      if (this.typeList.indexOf(notification.type) == -1) {
        throw new BusinessException(
          "Une notification doit être de type 'vue', 'abonne', 'favori' ou 'commentaire'"
        );
      }
    } else {
      throw new TechnicalException("Problème technique");
    }
  }
}
