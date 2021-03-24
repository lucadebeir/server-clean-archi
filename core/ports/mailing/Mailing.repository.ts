export default interface MailingRepository {
  sendMail(data: any): Promise<string>;
}
