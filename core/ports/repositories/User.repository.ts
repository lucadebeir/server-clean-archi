import User from "../../domain/User";

export interface UserRepository {
  register(user: User, host: any): Promise<string>;
  login(pseudo: any, password: any): Promise<string>;
  existByPseudo(pseudo: any): Promise<boolean>;
  findById(pseudo: any): Promise<User>;

  findAllAbonneUsers(): Promise<User[]>;
  updatePassword(
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any
  ): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(pseudo: any): Promise<string>;

  forgetPassword(email: any): Promise<string>;
  checkValideToken(token: any): Promise<string>;
  updatePasswordWithToken(token: any, newPassword: any): Promise<string>;

  sendFromContact(email: any, subject: any, message: any): Promise<string>;
  findAllExistingEmails(): Promise<string[]>;
  findAllExistingPseudo(): Promise<string[]>;
}
