import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import UpdateUserUseCase from "../../usecases/user/UpdateUser.usecase";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import { TechnicalException } from "../../exceptions/TechnicalException";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.password = "muca";
  user.abonneNews = true;
  user.email = "luca.debeir@gmail.com";
  user.emailConfirmed = true;
  user.admin = false;

  return user;
};

describe("Update user use case unit tests", () => {
  let updateUserUseCase: UpdateUserUseCase;

  let user: User;
  let token: TokenDomain = new TokenDomain();

  let userRepository: UserRepository = {
    update: null,
    existByPseudo: null,
    existByEmail: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    user = initUser();
    updateUserUseCase = new UpdateUserUseCase(userRepository);

    spyOn(userRepository, "update").and.callFake((user: User) => {
      if (user) {
        const result: User = user;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("updateUserUseCase should return user when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(false);
    spyOn(userRepository, "existByEmail").and.returnValue(false);
    spyOn(Utils, "isLogin").and.returnValue(true);
    const result: User = await updateUserUseCase.execute(user, token);
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual("luca");
    expect(result.email).toStrictEqual("luca.debeir@gmail.com");
    expect(result.admin).toStrictEqual(false);
    expect(result.emailConfirmed).toStrictEqual(true);
    expect(result.abonneNews).toStrictEqual(true);
  });

  it("updateUserUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updateUserUseCase.execute(user, undefined);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateUserUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updateUserUseCase should throw a parameter exception when the pseudo is lt 4", async () => {
    user.pseudo = "aaa";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un pseudo ne peut pas comporter moins de 4 caractères"
      );
    }
  });

  it("updateUserUseCase should throw a parameter exception when the pseudo is gt 29", async () => {
    user.pseudo = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un pseudo ne peut pas comporter plus de 29 caractères"
      );
    }
  });

  it("updateUserUseCase should throw a parameter exception when the pseudo already exists", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Un utilisateur existe déjà avec ce pseudo");
    }
  });

  it("updateUserUseCase should throw a parameter exception when the email is gt 59", async () => {
    user.email =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un email ne peut pas comporter plus de 59 caractères"
      );
    }
  });

  it("updateUserUseCase should throw a parameter exception when the email already exists", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(userRepository, "existByEmail").and.returnValue(true);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Un utilisateur existe déjà avec cet email");
    }
  });

  it("updateUserUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    user.pseudo = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("updateUserUseCase should throw a parameter exception when the email is undefined", async () => {
    user.email = undefined;
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await updateUserUseCase.execute(user, token);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email est obligatoire");
    }
  });
});
