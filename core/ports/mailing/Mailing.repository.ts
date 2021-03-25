import User from "../../domain/User";

export default interface MailingRepository {
  sendMail(data: any): void;
  sendMailWhenNewRecipe(data: any): void;
  sendMailAfterRegister(user: User, link: any): void;
  sendMailWhenUserForgetPassword(data: any): void;
  sendMailFromContact(data: any): void;
}
