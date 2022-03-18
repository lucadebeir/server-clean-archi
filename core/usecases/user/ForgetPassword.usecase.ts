import {BusinessException} from "../../exceptions/BusinessException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class ForgetPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailingRepository: MailingRepository
  ) {}

  async execute(email: any): Promise<{ pseudo: any; token: any }> {
    this.checkBusinessRules(email);

    const result = this.userRepository
      .forgetPassword(email)
      .then(async (result: { pseudo: any; token: any }) => {
        this.mailingRepository.sendMailWhenUserForgetPassword({
          pseudo: result.pseudo,
          resettoken: result.token,
          email: email,
        });
        return result;
      });

    return result;
  }

  private checkBusinessRules(email: any): void {
    if (email) {
      if (!this.userRepository.existByEmail(email)) {
        throw new BusinessException("L'utilisateur n'existe pas");
      }
    } else {
      throw new BusinessException("L'email est obligatoire");
    }
  }
}
