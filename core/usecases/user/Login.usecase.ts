import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(pseudo: any, password: any): Promise<string> {
    return this.userRepository.login(pseudo, password);
  }
}
