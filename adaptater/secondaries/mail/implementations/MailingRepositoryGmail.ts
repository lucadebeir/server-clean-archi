import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";

export default class MailingRepositoryGmail implements MailingRepository {
  sendMail(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
