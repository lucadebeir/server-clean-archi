import {BusinessException} from "../../exceptions/BusinessException";
import User from "../../domain/User";
import RegisterUseCase from "../../usecases/user/Register.usecase";
import UserRepository from "../../ports/repositories/User.repository";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import CryptRepository from "../../ports/crypt/Crypt.repository";

const initUser = (): User => {
  const user = new User();
  user.pseudo = "luca";
  user.password = "muca";
  user.confirmed_password = "muca";
  user.is_subscribed = true;
  user.email = "luca.debeir@gmail.com";

  return user;
};

describe("Register user use case unit tests", () => {
  let registerUseCase: RegisterUseCase;

  let user: User;
  let rand: number;
  let link: string;

  let userRepository: UserRepository = ({
    register: null,
    existByPseudo: null,
    existByEmail: null,
  } as unknown) as UserRepository;

  let mailingRepository: MailingRepository = ({
    sendMailAfterRegister: null,
  } as unknown) as MailingRepository;

  let cryptRepository: CryptRepository = {
    crypt: null
  } as unknown as CryptRepository;

  beforeEach(() => {
    user = initUser();
    rand = Math.floor(Math.random() * 100 + 54);
    link =
      "http://localhost/server/verify?id=" + rand + "&pseudo=" + user.pseudo;
    registerUseCase = new RegisterUseCase(userRepository, mailingRepository, cryptRepository);

    spyOn(cryptRepository, "crypt");

    spyOn(userRepository, "register").and.callFake((user: User) => {
      if (user) {
        const result: User = { ...user, is_admin: false, confirmed_email: false };
        return new Promise((resolve, reject) => resolve(result));
      }
      return new Promise((resolve, reject) => resolve(null));
    });

    spyOn(mailingRepository, "sendMailAfterRegister");
  });

  /*it("registerUseCase should return user when it succeeded", async () => {
    spyOn(userRepository, "existByPseudo").and.returnValue(false);
    spyOn(userRepository, "existByEmail").and.returnValue(false);
    const result: User = await registerUseCase.execute(user, link);
    expect(result).toBeDefined();
    expect(result.pseudo).toStrictEqual("luca");
    expect(result.email).toStrictEqual("luca.debeir@gmail.com");
    expect(result.is_admin).toStrictEqual(false);
    expect(result.confirmed_email).toStrictEqual(false);
    expect(result.is_subscribed).toStrictEqual(true);
  });*/

  it("registerUseCase should throw a parameter exception when the pseudo is lt 4", async () => {
    user.pseudo = "aaa";
    try {
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un pseudo ne peut pas comporter moins de 4 caractères"
      );
    }
  });

  it("registerUseCase should throw a parameter exception when the pseudo is gt 29", async () => {
    user.pseudo = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un pseudo ne peut pas comporter plus de 29 caractères"
      );
    }
  });

  it("registerUseCase should throw a parameter exception when the pseudo already exists", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(true);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Un utilisateur existe déjà avec ce pseudo");
    }
  });

  it("registerUseCase should throw a parameter exception when the email is gt 59", async () => {
    user.email =
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Un email ne peut pas comporter plus de 59 caractères"
      );
    }
  });

  it("registerUseCase should throw a parameter exception when the email already exists", async () => {
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(userRepository, "existByEmail").and.returnValue(true);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Un utilisateur existe déjà avec cet email");
    }
  });

  /*it("registerUseCase should throw a parameter exception when the email is not valid", async () => {
    try {
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: TechnicalException = e;
      expect(a.message).toBe("Cet email est invalide");
    }
  });*/

  it("registerUseCase should throw a parameter exception when the pseudo is undefined", async () => {
    user.pseudo = undefined;
    try {
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le pseudo est obligatoire");
    }
  });

  it("registerUseCase should throw a parameter exception when the email is undefined", async () => {
    user.email = undefined;
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("L'email est obligatoire");
    }
  });

  it("registerUseCase should throw a parameter exception when the password is undefined", async () => {
    user.password = undefined;
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le mot de passe est obligatoire");
    }
  });

  it("registerUseCase should throw a parameter exception when the password confirmation is undefined", async () => {
    user.confirmed_password = undefined;
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe("La confirmation du mot de passe est obligatoire");
    }
  });

  it("registerUseCase should throw a parameter exception when the password and the password confirmation are different", async () => {
    user.confirmed_password = "luca";
    try {
      spyOn(userRepository, "existByPseudo").and.returnValue(false);
      spyOn(userRepository, "existByEmail").and.returnValue(false);
      await registerUseCase.execute(user, link);
    } catch(e: any) {
      const a: BusinessException = e;
      expect(a.message).toBe(
        "Le mot de passe et la confirmation du mot de passe sont différents"
      );
    }
  });
});
