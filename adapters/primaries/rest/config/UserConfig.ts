import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CheckValideTokenUseCase from "../../../../core/usecases/user/CheckValideToken.usecase";
import DeleteUserUseCase from "../../../../core/usecases/user/DeleteUser.usecase";
import ExistByPseudoUseCase from "../../../../core/usecases/user/ExistByPseudo.usecase";
import ForgetPasswordUseCase from "../../../../core/usecases/user/ForgetPassword.usecase";
import FindAllAbonneMailUsersUsecase from "../../../../core/usecases/user/FindAllAbonneMailUsers.usecase";
import FindAllAbonneUsersUsecase from "../../../../core/usecases/user/FindAllAbonneUsers.usecase";
import FindAllExistingEmailsUsecase from "../../../../core/usecases/user/FindAllExistingEmails.usecase";
import FindAllExistingPseudoUsecase from "../../../../core/usecases/user/FindAllExistingPseudo.usecase";
import FindUserByIdUsecase from "../../../../core/usecases/user/FindUserById.usecase";
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
import CryptRepository from "../../../../core/ports/crypt/Crypt.repository";
import CryptRepositoryPCrypt from "../../../secondaries/crypt/implementations/CryptRepositoryPCrypt";

export default class UserConfig {
  private userRepository: UserRepository = new UserRepositorySQL();
  private mailingRepository: MailingRepository = new MailingRepositoryGmail();
  private cryptRepository: CryptRepository = new CryptRepositoryPCrypt();

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

  public getAllAbonneUsersUseCase(): FindAllAbonneUsersUsecase {
    return new FindAllAbonneUsersUsecase(this.userRepository);
  }

  public getAllAbonneMailUsersUseCase(): FindAllAbonneMailUsersUsecase {
    return new FindAllAbonneMailUsersUsecase(this.userRepository);
  }

  public getAllExistingEmailsUseCase(): FindAllExistingEmailsUsecase {
    return new FindAllExistingEmailsUsecase(this.userRepository);
  }

  public getAllExistingPseudoUseCase(): FindAllExistingPseudoUsecase {
    return new FindAllExistingPseudoUsecase(this.userRepository);
  }

  public getUserByIdUseCase(): FindUserByIdUsecase {
    return new FindUserByIdUsecase(this.userRepository);
  }

  public loginUseCase(): LoginUseCase {
    return new LoginUseCase(this.userRepository, this.cryptRepository);
  }

  public gLoginUseCase(): GoogleLoginUseCase {
    return new GoogleLoginUseCase(this.userRepository);
  }

  public registerUseCase(): RegisterUseCase {
    return new RegisterUseCase(this.userRepository, this.mailingRepository, this.cryptRepository);
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
    return new UpdatePasswordUseCase(this.userRepository, this.cryptRepository);
  }

  public updatePasswordWithTokenUseCase(): UpdatePasswordWithTokenUseCase {
    return new UpdatePasswordWithTokenUseCase(this.userRepository, this.cryptRepository);
  }

  public updateUserUseCase(): UpdateUserUseCase {
    return new UpdateUserUseCase(this.userRepository);
  }
}
