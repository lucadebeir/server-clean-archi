import Notification from "../../domain/Notification";
import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import UpdateNotificationUseCase from "../../usecases/notification/UpdateNotification.usecase";
import { BusinessException } from "../../exceptions/BusinessException";

const initNotification = (): Notification => {
  const notification = new Notification();
  notification.type = "vue";
  notification.id = 1;

  return notification;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Update notification use case unit tests", () => {
  let updateNotificationUseCase: UpdateNotificationUseCase;

  let notification: Notification;
  let token: TokenDomain;
  let list = ["vue", "abonne", "favori", "commentaire", "user"];

  let notificationRepository: NotificationRepository = ({
    update: null,
    existById: null,
  } as unknown) as NotificationRepository;

  beforeEach(() => {
    notification = initNotification();
    token = initToken();

    updateNotificationUseCase = new UpdateNotificationUseCase(
      notificationRepository
    );

    spyOn(notificationRepository, "update").and.callFake((id: any) => {
      if (id) {
        const result: string = "La notification a bien changé de statut";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateNotificationUseCase should return notifications when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    spyOn(notificationRepository, "existById").and.returnValue(true);
    const result: string = await updateNotificationUseCase.execute(
      notification.id,
      token
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual("La notification a bien changé de statut");
  });

  it("updateNotificationUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await updateNotificationUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas modifier cette ressource");
    }
  });

  it("updateNotificationUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await updateNotificationUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous ne pouvez pas modifier cette ressource");
    }
  });

  it("updateNotificationUseCase should throw a parameter exception when the id is undefined", async () => {
    notification.id = undefined;
    try {
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateNotificationUseCase.execute(
        notification.id,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "L'identifiant d'une notification est obligatoire"
      );
    }
  });

  it("updateNotificationUseCase should throw a parameter exception when the notification doesn't exist", async () => {
    try {
      spyOn(notificationRepository, "existById").and.returnValue(false);
      spyOn(Utils, "isAdmin").and.returnValue(true);
      await updateNotificationUseCase.execute(
        notification.id,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La notification n'existe pas");
    }
  });
});
