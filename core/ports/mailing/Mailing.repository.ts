export default interface MailingRepository {
  sendMail(): Promise<string>;
}
