import {BusinessException} from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import Token from "../../domain/Token";
import * as Utils from "../../utils/token.service";
import {TechnicalException} from "../../exceptions/TechnicalException";
import FindUserByIdUsecase from "../../usecases/user/FindUserById.usecase";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.password = "muca";
  user.is_subscribed = true;
  user.email = "luca.debeir@gmail.com";
  user.confirmed_email = true;
  user.is_admin = false;

  return user;
};

const initToken = (): Token => {
  const token = new Token();
  token.pseudo = "luca";

  return token;
};

describe("Get user by id use case unit tests", () => {
  let getUserByIdUseCase: FindUserByIdUsecase;

  let user: User;
  let token: Token;

  let userRepository: UserRepository = {
    findById: null,
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();
    getUserByIdUseCase = new FindUserByIdUsecase(userRepository);

    spyOn(userRepository, "findById").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: User = user;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("getUserByIdUseCase should return string when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: User = await getUserByIdUseCase.execute(user.pseudo, token);
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual(user.pseudo);
  });

  it("getUserByIdUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await getUserByIdUseCase.execute(user.pseudo, undefined);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getUserByIdUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await getUserByIdUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  });

  it("getUserByIdUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await getUserByIdUseCase.execute(undefined, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("getUserByIdUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await getUserByIdUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("getUserByIdUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await getUserByIdUseCase.execute(user.pseudo, token);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });
});
