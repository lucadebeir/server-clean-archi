import User from "../../domain/User";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailingRepository: MailingRepository
  ) {}

  async execute(user: User, link: any): Promise<string> {
    this.mailingRepository.sendMailAfterRegister(user, link);
    return this.userRepository.register(user);
  }
}
