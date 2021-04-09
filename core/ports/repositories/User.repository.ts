import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";

export default interface UserRepository {
  register(user: User): Promise<User>;
  login(pseudo: any, password: any): Promise<TokenDomain>;
  existByPseudo(pseudo: any): Promise<boolean>;
  existByEmail(email: any): Promise<boolean>;
  findById(pseudo: any): Promise<User>;

  findAllAbonneUsers(): Promise<User[]>;
  updatePassword(pseudo: any, newPassword: any): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(pseudo: any): Promise<string>;

  forgetPassword(email: any): Promise<string>;
  checkValideToken(token: any): Promise<string>;
  updatePasswordWithToken(
    token?: TokenDomain,
    newPassword?: any
  ): Promise<string>;

  sendFromContact(email: any, subject: any, message: any): Promise<string>;
  findAllExistingEmails(): Promise<string[]>;
  findAllExistingPseudo(): Promise<string[]>;

  checkEmailConfirmed(pseudo: any): Promise<boolean>;
}
