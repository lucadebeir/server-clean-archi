import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CheckValideTokenUseCase from "../../../../core/usecases/user/CheckValideToken.usecase";
import DeleteUserUseCase from "../../../../core/usecases/user/DeleteUser.usecase";
import ExistByPseudoUseCase from "../../../../core/usecases/user/ExistByPseudo.usecase";
import ForgetPasswordUseCase from "../../../../core/usecases/user/ForgetPassword.usecase";
import GetAllAbonneMailUsersUseCase from "../../../../core/usecases/user/GetAllAbonneMailUsers.usecase";
import GetAllAbonneUsersUseCase from "../../../../core/usecases/user/GetAllAbonneUsers.usecase";
import GetAllExistingEmailsUseCase from "../../../../core/usecases/user/GetAllExistingEmails.usecase";
import GetAllExistingPseudoUseCase from "../../../../core/usecases/user/GetAllExistingPseudo.usecase";
import GetUserByIdUseCase from "../../../../core/usecases/user/GetUserById.usecase";
import GoogleLoginUseCase from "../../../../core/usecases/user/GoogleLogin.usecase";
import GoogleRegisterUseCase from "../../../../core/usecases/user/GoogleRegister.usecase";
import LoginUseCase from "../../../../core/usecases/user/Login.usecase";
import RegisterUseCase from "../../../../core/usecases/user/Register.usecase";
import SendFromContactUseCase from "../../../../core/usecases/user/SendFromContact.usecase";
import UpdatePasswordUseCase from "../../../../core/usecases/user/UpdatePassword.usecase";
import UpdatePasswordWithTokenUseCase from "../../../../core/usecases/user/UpdatePasswordWithToken.usecase";
import UpdateUserUseCase from "../../../../core/usecases/user/UpdateUser.usecase";
import MailingRepositoryGmail from "../../../secondaries/mail/implementations/MailingRepositoryGmail";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class UserConfig {
  private userRepository: UserRepository = new UserRepositorySQL();
  private mailingRepository: MailingRepository = new MailingRepositoryGmail();

  public checkValideTokenUseCase(): CheckValideTokenUseCase {
    return new CheckValideTokenUseCase(this.userRepository);
  }

  public deleteUserUseCase(): DeleteUserUseCase {
    return new DeleteUserUseCase(this.userRepository);
  }

  public existByPseudoUseCase(): ExistByPseudoUseCase {
    return new ExistByPseudoUseCase(this.userRepository);
  }

  public forgetPasswordUseCase(): ForgetPasswordUseCase {
    return new ForgetPasswordUseCase(
      this.userRepository,
      this.mailingRepository
    );
  }

  public getAllAbonneUsersUseCase(): GetAllAbonneUsersUseCase {
    return new GetAllAbonneUsersUseCase(this.userRepository);
  }

  public getAllAbonneMailUsersUseCase(): GetAllAbonneMailUsersUseCase {
    return new GetAllAbonneMailUsersUseCase(this.userRepository);
  }

  public getAllExistingEmailsUseCase(): GetAllExistingEmailsUseCase {
    return new GetAllExistingEmailsUseCase(this.userRepository);
  }

  public getAllExistingPseudoUseCase(): GetAllExistingPseudoUseCase {
    return new GetAllExistingPseudoUseCase(this.userRepository);
  }

  public getUserByIdUseCase(): GetUserByIdUseCase {
    return new GetUserByIdUseCase(this.userRepository);
  }

  public loginUseCase(): LoginUseCase {
    return new LoginUseCase(this.userRepository);
  }

  public gLoginUseCase(): GoogleLoginUseCase {
    return new GoogleLoginUseCase(this.userRepository);
  }

  public registerUseCase(): RegisterUseCase {
    return new RegisterUseCase(this.userRepository, this.mailingRepository);
  }

  public gRegisterUseCase(): GoogleRegisterUseCase {
    return new GoogleRegisterUseCase(
      this.userRepository,
      this.mailingRepository
    );
  }

  public sendFromContactUseCase(): SendFromContactUseCase {
    return new SendFromContactUseCase(
      this.userRepository,
      this.mailingRepository
    );
  }

  public updatePasswordUseCase(): UpdatePasswordUseCase {
    return new UpdatePasswordUseCase(this.userRepository);
  }

  public updatePasswordWithTokenUseCase(): UpdatePasswordWithTokenUseCase {
    return new UpdatePasswordWithTokenUseCase(this.userRepository);
  }

  public updateUserUseCase(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.userRepository);
  }
}
