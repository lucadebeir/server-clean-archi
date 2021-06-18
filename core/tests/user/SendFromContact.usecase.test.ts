import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";
import SendFromContactUseCase from "../../usecases/user/SendFromContact.usecase";
import MailingRepository from "../../ports/mailing/Mailing.repository";

describe("Update password use case unit tests", () => {
  let sendFromContactUseCase: SendFromContactUseCase;

  let email: string;
  let subject: string;
  let message: string;

  let userRepository: UserRepository = {
    sendFromContact: null,
  } as unknown as UserRepository;

  let mailingRepository: MailingRepository = {
    sendMailFromContact: null,
  } as unknown as MailingRepository;

  beforeEach(() => {
    email = "l.debeir@me.com";
    subject = "Boite à question";
    message = "Aaaaaaa";

    sendFromContactUseCase = new SendFromContactUseCase(
      userRepository,
      mailingRepository
    );
  });

  it("sendFromContactUseCase should return string when it succeeded", async () => {
    const result: void = await sendFromContactUseCase.execute(
      email,
      subject,
      message
    );
    expect(result).toBeCalled();
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
