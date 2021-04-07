import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import { TechnicalException } from "../../exceptions/TechnicalException";
import ForgetPasswordUseCase from "../../usecases/user/ForgetPassword.usecase";

const initUser = (): User => {
  const user = new User();
  user.email = "luca.debeir@gmail.com";

  return user;
};

describe("Forget password use case unit tests", () => {
  let forgetPasswordUseCase: ForgetPasswordUseCase;

  let user: User;

  let userRepository: UserRepository = ({
    forgetPassword: null,
    existByEmail: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    user = initUser();
    forgetPasswordUseCase = new ForgetPasswordUseCase(userRepository);

    spyOn(userRepository, "forgetPassword").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: string = "Email bien envoyé";
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });
  });

  it("forgetPasswordUseCase should return string when it succeeded", async () => {
    spyOn(userRepository, "existByEmail").and.returnValue(true);
    const result: string = await forgetPasswordUseCase.execute(user.email);
    expect(result).toBeDefined();
    expect(result).toStrictEqual("Email bien envoyé");
  });

  it("forgetPasswordUseCase should throw a parameter exception when the email is undefined", async () => {
    try {
      await forgetPasswordUseCase.execute(undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email est obligatoire");
    }
  });

  it("forgetPasswordUseCase should throw a parameter exception when the email doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await forgetPasswordUseCase.execute(user.email);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
