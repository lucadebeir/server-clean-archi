import Token from "../../domain/Token";
import User from "../../domain/User";

export default interface UserRepository {
  register(user: User): Promise<User>;
  gRegister(user: User): Promise<User>;
  login(email: any, password: any): Promise<Token>;
  gLogin(token: any): Promise<Token>;
  existByPseudo(pseudo: any): Promise<boolean>;
  existByEmail(email: any): Promise<boolean>;
  findById(pseudo: any): Promise<User>;

  findAllAbonneUsers(): Promise<User[]>;
  findAllAbonneMailUsers(): Promise<{ name: any; address: any }[]>;
  updatePassword(pseudo: any, newPassword: any): Promise<User>;
  update(user: User): Promise<User>;
  deleteById(pseudo: any): Promise<string>;

  forgetPassword(email: any): Promise<{ pseudo: any; token: any }>;
  checkValideToken(token: any): Promise<string>;
  updatePasswordWithToken(
    token?: Token,
    newPassword?: any
  ): Promise<string>;

  findAllExistingEmails(): Promise<string[]>;
  findAllExistingPseudo(): Promise<string[]>;

  checkEmailConfirmed(email: any): Promise<boolean>;
}
