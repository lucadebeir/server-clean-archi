import Notification from "../../domain/Notification";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import CreateNotificationUseCase from "../../usecases/notification/CreateNotification.usecase";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";

const initNotification = (): Notification => {
  const notification = new Notification();
  notification.type = "vue";

  return notification;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Create notification use case unit tests", () => {
  let createNotificationUseCase: CreateNotificationUseCase;

  let notification: Notification;
  let token: TokenDomain;
  let date: string = Date.now().toString();
  let list = ["vue", "abonne", "favori", "commentaire"];

  let notificationRepository: NotificationRepository = ({
    create: null,
  } as unknown) as NotificationRepository;

  let recipeRepository: RecipeRepository = ({
    existById: null,
  } as unknown) as RecipeRepository;

  let userRepository: UserRepository = ({
    existByPseudo: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    notification = initNotification();
    token = initToken();

    createNotificationUseCase = new CreateNotificationUseCase(
      notificationRepository,
      userRepository,
      recipeRepository
    );

    spyOn(notificationRepository, "create").and.callFake(
      (notification: Notification) => {
        if (notification) {
          const result: Notification = {
            ...notification,
            idNotification: 1,
            enabled: false,
            date: date,
          };
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("createNotificationUseCase should return notification when it succeeded", async () => {
    const result: Notification = await createNotificationUseCase.execute(
      notification
    );
    expect(result).toBeDefined();
    expect(result.idNotification).toStrictEqual(1);
    expect(
      list.filter((x) => result.type && result.type.indexOf(x) > -1).length
    ).toBeGreaterThan(0);
    expect(result.date).toStrictEqual(date);
    expect(result.enabled).toStrictEqual(false);
  });

  it("createNotificationUseCase should throw a parameter exception when the type not correct", async () => {
    try {
      await createNotificationUseCase.execute(notification);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Une notification doit être de type 'vue', 'abonne', 'favori' ou 'commentaire'"
      );
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the type not correct", async () => {
    notification.type = undefined;
    try {
      await createNotificationUseCase.execute(notification);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Problème technique");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the user doesn't exist when pseudo is not null", async () => {
    notification.pseudo = "luca";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await createNotificationUseCase.execute(notification, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the user is not connected when pseudo is not null", async () => {
    notification.pseudo = "luca";
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createNotificationUseCase.execute(notification, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the user connected and pseudo not null don't correspond", async () => {
    notification.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createNotificationUseCase.execute(notification, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the recipe doesnt exist when idRecette is not null", async () => {
    notification.idRecette = 1;
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await createNotificationUseCase.execute(notification);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });
});
