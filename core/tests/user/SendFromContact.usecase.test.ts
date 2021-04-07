import { BusinessException } from "../../exceptions/BusinessException";
import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";
import TokenDomain from "../../domain/Token.domain";
import * as Utils from "../../utils/token.service";
import { TechnicalException } from "../../exceptions/TechnicalException";
import SendFromContactUseCase from "../../usecases/user/SendFromContact.usecase";

describe("Update password use case unit tests", () => {
  let sendFromContactUseCase: SendFromContactUseCase;

  let name: string;
  let email: string;
  let subject: string;
  let message: string;
  let token: TokenDomain;

  let userRepository: UserRepository = ({
    sendFromContact: null,
  } as unknown) as UserRepository;

  beforeEach(() => {
    email = "l.debeir@me.com";
    subject = "Boite à question";
    message = "Aaaaaaa";

    sendFromContactUseCase = new SendFromContactUseCase(userRepository);

    spyOn(userRepository, "sendFromContact").and.callFake(
      (email: any, subject: any, message: any) => {
        if (email && subject && message) {
          const result: string =
            "L'utilisateur envoie un mail aux administrateurs";
          return new Promise((resolve, reject) => resolve(result));
        }
        return new Promise((resolve, reject) => resolve(null));
      }
    );
  });

  it("sendFromContactUseCase should return string when it succeeded", async () => {
    const result: string = await sendFromContactUseCase.execute(
      email,
      subject,
      message
    );
    expect(result).toBeDefined();
    expect(result).toStrictEqual(
      "L'utilisateur envoie un mail aux administrateurs"
    );
  });

  it("sendFromContactUseCase should throw a parameter exception when the email is undefined", async () => {
    try {
      await sendFromContactUseCase.execute(undefined, subject, message);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ pour le mail est obligatoire");
    }
  });

  it("sendFromContactUseCase should throw a parameter exception when the subject is undefined", async () => {
    try {
      await sendFromContactUseCase.execute(email, undefined, message);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ pour l'objet est obligatoire");
    }
  });

  it("sendFromContactUseCase should throw a parameter exception when the message is undefined", async () => {
    try {
      await sendFromContactUseCase.execute(email, subject, undefined);
    } catch (e) {
      const a: BusinessException = e;
      expect(a.message).toBe("Le champ pour le message est obligatoire");
    }
  });
});
