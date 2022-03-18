import {BusinessException} from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import ForgetPasswordUseCase from "../../usecases/user/ForgetPassword.usecase";
import MailingRepository from "../../ports/mailing/Mailing.repository";

const initUser = (): User => {
  const user = new User();
  user.email = "luca.debeir@gmail.com";

  return user;
};

describe("Forget password use case unit tests", () => {
  let forgetPasswordUseCase: ForgetPasswordUseCase;

  let user: User;

  let userRepository: UserRepository = {
    forgetPassword: null,
    existByEmail: null,
  } as unknown as UserRepository;

  let mailingRepository: MailingRepository = {
    sendMailWhenUserForgetPassword: null
  } as unknown as MailingRepository;

  beforeEach(() => {
    user = initUser();
    forgetPasswordUseCase = new ForgetPasswordUseCase(
      userRepository,
      mailingRepository
    );

    spyOn(userRepository, "forgetPassword").and.callFake((pseudo: any) => {
      if (pseudo) {
        const result: { pseudo: any; token: any } = {
          pseudo: "luca",
          token: "dfdgd654GEvfzvsc",
        };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });

    spyOn(mailingRepository, "sendMailWhenUserForgetPassword");
  });

  it("forgetPasswordUseCase should return string when it succeeded", async () => {
    spyOn(userRepository, "existByEmail").and.returnValue(true);
    const result: {
      pseudo: any;
      token: any;
    } = await forgetPasswordUseCase.execute(user.email);
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual("luca");
    expect(result.token).toBeDefined();
  });

  it("forgetPasswordUseCase should throw a parameter exception when the email is undefined", async () => {
    try {
      await forgetPasswordUseCase.execute(undefined);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email est obligatoire");
    }
  });

  it("forgetPasswordUseCase should throw a parameter exception when the email doesn't exist", async () => {
    try {
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await forgetPasswordUseCase.execute(user.email);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'utilisateur n'existe pas");
    }
  });
});
