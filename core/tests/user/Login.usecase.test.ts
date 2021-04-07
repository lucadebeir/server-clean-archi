import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import LoginUseCase from "../../usecases/user/Login.usecase";
import TokenDomain from "../../domain/Token.domain";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.mdp = "muca";

  return user;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";

  return token;
};

describe("Login user use case unit tests", () => {
  let loginUseCase: LoginUseCase;

  let user: User;
  let token: TokenDomain;

  let userRepository: UserRepository = ({
    login: null,
    existByPseudo: null,
    checkEmailConfirmed: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();

    loginUseCase = new LoginUseCase(userRepository);

    spyOn(userRepository, "login").and.callFake(
      (pseudo: any, password: any) => {
        if (pseudo && password) {
          const result: TokenDomain = token;
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("loginUseCase should return token when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(true);
    spyOn(userRepository, "checkEmailConfirmed").and.returnValue(true);
    const result: TokenDomain = await loginUseCase.execute(
      user.pseudo,
      user.mdp
    );
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual("luca");
  });

  it("loginUseCase should throw a parameter exception when the pseudo already exists", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Aucun utilisateur n'existe avec ce pseudo");
    }
  });

  it("loginUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    user.pseudo = undefined;
    try {
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("loginUseCase should throw a parameter exception when the password is undefined", async () => {
    user.mdp = undefined;
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le mot de passe est obligatoire");
    }
  });

  it("loginUseCase should throw a parameter exception when the email is not confirmed", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      spyOn(userRepository, "checkEmailConfirmed").and.returnValue(false);
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email de l'utilisateur n'est pas confirmé");
    }
  });

  /*it("registerUseCase should throw a parameter exception when the password is incorrect", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce mot de passe est invalide");
    }
  });*/
});
