import {TechnicalException} from "../../exceptions/TechnicalException";
import * as Utils from "../../utils/token.service";
import Token from "../../domain/Token";
import StatistiqueRepository from "../../ports/repositories/Statistique.repository";
import User from "../../domain/User";
import FindUsersXAbonnesUseCase from "../../usecases/statistique/FindNbUsersAndAbonnes.usecase";

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

const initUsers = (): User[] => {
  const user = new User();
  user.pseudo = "luca";
  user.is_subscribed = true;

  const user2 = new User();
  user.pseudo = "admin";
  user.is_subscribed = false;

  return [user, user2];
};

describe("Find nombre users and abonnes use case unit tests", () => {
  let findUsersXAbonnesUseCase: FindUsersXAbonnesUseCase;

  let token: Token;
  let users: User[];

  let statistiqueRepository: StatistiqueRepository = ({
    findUsersXAbonnes: null,
  } as unknown) as StatistiqueRepository;

  beforeEach(() => {
    token = initToken();
    users = initUsers();

    findUsersXAbonnesUseCase = new FindUsersXAbonnesUseCase(
      statistiqueRepository
    );

    spyOn(statistiqueRepository, "findUsersXAbonnes").and.callFake(() => {
      const result: User[] = users;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("findUsersXAbonnesUseCase should return users when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: User[] = await findUsersXAbonnesUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
  });

  it("findUsersXAbonnesUseCase should throw a parameter exception when the token is null", async () => {
    try {
      await findUsersXAbonnesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });

  it("findUsersXAbonnesUseCase should throw a parameter exception when the user is not an admin", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await findUsersXAbonnesUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Vous n'avez pas accès à cette ressource");
    }
  });
});
