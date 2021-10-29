import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UpdatePasswordUseCase from "../../usecases/user/UpdatePassword.usecase";

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

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";
  token.password = "muca";

  return token;
};

describe("Update password use case unit tests", () => {
  let updatePasswordUseCase: UpdatePasswordUseCase;

  let user: User;
  let token: TokenDomain;

  let newPassword: string;
  let confirmNewPassword: string;

  let userRepository: UserRepository = {
    updatePassword: null,
    existByPseudo: null,
  } as unknown as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();
    updatePasswordUseCase = new UpdatePasswordUseCase(userRepository);

    newPassword = "luca";
    confirmNewPassword = "luca";

    spyOn(userRepository, "updatePassword").and.callFake(
      (
        pseudo: any,
        newPassword: any
      ) => {
        if (pseudo && newPassword) {
          const result: User = user;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("updatePasswordUseCase should return string when it succeeded", async () => {
    spyOn(Utils, "isLogin").and.returnValue(true);
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    const result: User = await updatePasswordUseCase.execute(
      user.pseudo,
      user.password,
      newPassword,
      confirmNewPassword,
      token
    );
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual(user.pseudo);
  });

  it("updatePasswordUseCase should throw a parameter exception when the user is null", async () => {
    try {
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        undefined
      );
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the user is not connected", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(false);
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe(
        "Vous n'avez pas le droit de modifier cette ressource"
      );
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      await updatePasswordUseCase.execute(
        undefined,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the pseudo doesn't exist", async () => {
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the pseudo doesn't correspond to the token pseudo", async () => {
    token.pseudo = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "La personne connectée n'est pas la personne correspondant au pseudo en question"
      );
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the oldpassword is not good", async () => {
    user.password = "lala";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'ancien mot de passe n'est pas correct");
    }
  });

  it("updatePasswordUseCase should throw a parameter exception when the new password and the confirmation are differents", async () => {
    confirmNewPassword = "lucas";
    try {
      spyOn(Utils, "isLogin").and.returnValue(true);
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await updatePasswordUseCase.execute(
        user.pseudo,
        user.password,
        newPassword,
        confirmNewPassword,
        token
      );
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le nouveau mot de passe et sa confirmation ne correspondent pas"
      );
    }
  });
});
