import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import Token from "../../domain/Token";
import * as Utils from "../../utils/token.service";
import {TechnicalException} from "../../exceptions/TechnicalException";
import GetAllAbonneUsersUseCase from "../../usecases/user/GetAllAbonneUsers.usecase";

const initUsers = (): User[] => {
  const user = new User();
  user.pseudo = "luca";
  user.password = "muca";
  user.is_subscribed = true;
  user.email = "luca.debeir@gmail.com";
  user.confirmed_email = true;
  user.is_admin = false;

  const user2 = new User();
  user2.pseudo = "lucas";
  user2.password = "muca";
  user2.is_subscribed = true;
  user2.email = "lucas.debeir@gmail.com";
  user2.confirmed_email = true;
  user2.is_admin = false;

  return [user, user2];
};

describe("Get all abonne users use case unit tests", () => {
  let getAllAbonneUsersUseCase: GetAllAbonneUsersUseCase;

  let users: User[];
  let token: Token = new Token();

  let userRepository: UserRepository = {
    findAllAbonneUsers: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    users = initUsers();
    getAllAbonneUsersUseCase = new GetAllAbonneUsersUseCase(userRepository);

    spyOn(userRepository, "findAllAbonneUsers").and.callFake(() => {
      const result: User[] = users;
      return new Promise((resolve, reject) => resolve(result));
    });
  });

  it("getAllAbonneUsersUseCase should return user when it succeeded", async () => {
    spyOn(Utils, "isAdmin").and.returnValue(true);
    const result: User[] = await getAllAbonneUsersUseCase.execute(token);
    expect(result).toBeDefined();
    expect(result.length).toStrictEqual(2);
    expect(result).toHaveLength(2);
    expect(result.map((user) => expect(users).toContain(user)));
    expect(result.some(({ is_subscribed }) => is_subscribed)).toBe(true);
  });

  it("getAllAbonneUsersUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getAllAbonneUsersUseCase.execute(undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getAllAbonneUsersUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isAdmin").and.returnValue(false);
      await getAllAbonneUsersUseCase.execute(token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });
});
