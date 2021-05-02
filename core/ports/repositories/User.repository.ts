import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";

export default interface UserRepository {
  register(user: User): Promise<User>;
  gRegister(user: User): Promise<User>;
  login(email: any, password: any): Promise<TokenDomain>;
  gLogin(token: any): Promise<TokenDomain>;
  existByPseudo(pseudo: any): Promise<boolean>;
  existByEmail(email: any): Promise<boolean>;
  findById(pseudo: any): Promise<User>;

  findAllAbonneUsers(): Promise<User[]>;
  findAllAbonneMailUsers(): Promise<{ name: any; address: any }[]>;
  updatePassword(pseudo: any, newPassword: any): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(pseudo: any): Promise<string>;

  forgetPassword(email: any): Promise<{ pseudo: any; resettoken: any }>;
  checkValideToken(token: any): Promise<string>;
  updatePasswordWithToken(
    token?: TokenDomain,
    newPassword?: any
  ): Promise<string>;

  findAllExistingEmails(): Promise<string[]>;
  findAllExistingPseudo(): Promise<string[]>;

  checkEmailConfirmed(pseudo: any): Promise<boolean>;
}
