import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import LoginUseCase from "../../usecases/user/Login.usecase";
import TokenDomain from "../../domain/Token.domain";

const initUser = (): User => {
  const user = new User();
  user.email = "luca.debeir@gmail.com";
  user.password = "muca";

  return user;
};

const initToken = (): TokenDomain => {
  const token = new TokenDomain();
  token.pseudo = "luca";
  token.email = "luca.debeir@gmail.com";

  return token;
};

describe("Login user use case unit tests", () => {
  let loginUseCase: LoginUseCase;

  let user: User;
  let token: TokenDomain;

  let userRepository: UserRepository = ({
    login: null,
    existByEmail: null,
    checkEmailConfirmed: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    user = initUser();
    token = initToken();

    loginUseCase = new LoginUseCase(userRepository);

    spyOn(userRepository, "login").and.callFake((email: any, password: any) => {
      if (email && password) {
        const result: TokenDomain = token;
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("loginUseCase should return token when it succeeded", async () => {
    spyOn(userRepository, "existByEmail").and.returnValue(true);
    spyOn(userRepository, "checkEmailConfirmed").and.returnValue(true);
    const result: TokenDomain = await loginUseCase.execute(
      user.email,
      user.password
    );
    expect(result).toBeDefined();
    expect(result.email).toStrictEqual("luca.debeir@gmail.com");
  });

  it("loginUseCase should throw a parameter exception when the email already exists", async () => {
    try {
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await loginUseCase.execute(user.email, user.password);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Aucun utilisateur n'existe avec cet email");
    }
  });

  it("loginUseCase should throw a parameter exception when the email is undefined", async () => {
    user.email = undefined;
    try {
      await loginUseCase.execute(user.email, user.password);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email est obligatoire");
    }
  });

  it("loginUseCase should throw a parameter exception when the password is undefined", async () => {
    user.password = undefined;
    try {
      spyOn(userRepository, "existByEmail").and.returnValue(true);
      await loginUseCase.execute(user.email, user.password);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le mot de passe est obligatoire");
    }
  });

  it("loginUseCase should throw a parameter exception when the email is not confirmed", async () => {
    try {
      spyOn(userRepository, "existByEmail").and.returnValue(true);
      spyOn(userRepository, "checkEmailConfirmed").and.returnValue(false);
      await loginUseCase.execute(user.email, user.password);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email de l'utilisateur n'est pas confirmé");
    }
  });

  /*it("registerUseCase should throw a parameter exception when the password is incorrect", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await loginUseCase.execute(user.pseudo, user.mdp);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Ce mot de passe est invalide");
    }
  });*/
});
