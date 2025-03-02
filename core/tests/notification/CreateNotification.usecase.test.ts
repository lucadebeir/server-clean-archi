import Notification from "../../domain/Notification";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import CreateNotificationUseCase from "../../usecases/notification/CreateNotification.usecase";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import RecipeRepository from "../../ports/repositories/Recipe.repository";
import UserRepository from "../../ports/repositories/User.repository";

const initNotification = (): Notification => {
  const notification = new Notification();
  notification.type = "vue";

  return notification;
};

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Create notification use case unit tests", () => {
  let createNotificationUseCase: CreateNotificationUseCase;

  let notification: Notification;
  let token: Token;
  let date: string = Date.now().toString();
  let list = ["vue", "abonne", "favori", "commentaire", "user"];

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
            id: 1,
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
    expect(result.id).toStrictEqual(1);
    expect(
      list.filter((x) => result.type && result.type.indexOf(x) > -1).length
    ).toBeGreaterThan(0);
    expect(result.date).toStrictEqual(date);
    expect(result.enabled).toStrictEqual(false);
  });

  it("createNotificationUseCase should throw a parameter exception when the type not correct", async () => {
    try {
      await createNotificationUseCase.execute(notification);
    } catch(e: any) {
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
    } catch(e: any) {
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
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the user is not connected when pseudo is not null", async () => {
    notification.pseudo = "luca";
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createNotificationUseCase.execute(notification, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the user connected and pseudo not null don't correspond", async () => {
    notification.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await createNotificationUseCase.execute(notification, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("createNotificationUseCase should throw a parameter exception when the recipe doesnt exist when idRecette is not null", async () => {
    notification.id_recipe = 1;
    try {
      spyOn(recipeRepository, "existById").and.returnValue(false);
      await createNotificationUseCase.execute(notification);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La recette n'existe pas");
    }
  });
});
