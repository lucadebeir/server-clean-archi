import Notification from "../../domain/Notification";
import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import FindAllNotificationsUsecase from "../../usecases/notification/FindAllNotifications.usecase";

const initNotifications = (): Notification[] => {
  const notification = new Notification();
  notification.type = "vue";

  const notification2 = new Notification();
  notification2.type = "commentaire";

  return [notification, notification2];
};

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Get all notifications use case unit tests", () => {
  let getAllNotificationsUseCase: FindAllNotificationsUsecase;

  let notifications: Notification[];
  let token: Token;
  let list = ["vue", "abonne", "favori", "commentaire", "user"];

  let notificationRepository: NotificationRepository = ({
    findAll: null,
  } as unknown) as NotificationRepository;

  beforeEach(() => {
    notifications = initNotifications();
    token = initToken();

    getAllNotificationsUseCase = new FindAllNotificationsUsecase(
      notificationRepository
    );

    spyOn(notificationRepository, "findAll").and.callFake(() => {
      const result: Notification[] = notifications;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllNotificationsUseCase should return notifications when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Notification[] = await getAllNotificationsUseCase.execute(
      token
    );
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(
      result.filter((x) => x.type && list.indexOf(x.type) > -1).length
    ).toBeGreaterThan(0);
  });

  it("getAllNotificationsUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await getAllNotificationsUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });

  it("getAllNotificationsUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllNotificationsUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });
});
