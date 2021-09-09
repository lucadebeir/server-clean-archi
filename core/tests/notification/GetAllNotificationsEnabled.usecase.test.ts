import Notification from "../../domain/Notification";
import { TechnicalException } from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import TokenDomain from "../../domain/Token.domain";
import NotificationRepository from "../../ports/repositories/Notification.repository";
import GetAllNotificationsEnabledUseCase from "../../usecases/notification/GetAllNotificationsEnabled.usecase";

const initNotifications = (): Notification[] => {
  const notification = new Notification();
  notification.type = "vue";
  notification.enabled = true;

  const notification2 = new Notification();
  notification2.type = "commentaire";
  notification2.enabled = true;

  return [notification, notification2];
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Get all notifications enabled use case unit tests", () => {
  let getAllNotificationsEnabledUseCase: GetAllNotificationsEnabledUseCase;

  let notifications: Notification[];
  let token: TokenDomain;
  let list = ["vue", "abonne", "favori", "commentaire", "user"];

  let notificationRepository: NotificationRepository = ({
    findAllNotificationsEnabled: null,
  } as unknown) as NotificationRepository;

  beforeEach(() => {
    notifications = initNotifications();
    token = initToken();

    getAllNotificationsEnabledUseCase = new GetAllNotificationsEnabledUseCase(
      notificationRepository
    );

    spyOn(notificationRepository, "findAllNotificationsEnabled").and.callFake(
      () => {
        const result: Notification[] = notifications;
        return new Promise((resolve, reject) => resolve(result));
      }
    );
  });

  it("getAllNotificationsEnabledUseCase should return notifications when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: Notification[] = await getAllNotificationsEnabledUseCase.execute(
      token
    );
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(
      result.filter((x) => x.type && list.indexOf(x.type) > -1).length
    ).toBeGreaterThan(0);
    expect(result.filter((x) => x.enabled).length).toStrictEqual(result.length);
  });

  it("getAllNotificationsEnabledUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await getAllNotificationsEnabledUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });

  it("getAllNotificationsEnabledUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllNotificationsEnabledUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à ces ressources");
    }
  });
});
