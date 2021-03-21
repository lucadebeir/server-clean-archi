import { UserRepository } from "../../ports/repositories/User.repository";

export default class SendFromContactUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any, subject: any, message: any): Promise<string> {
    return this.userRepository.sendFromContact(email, subject, message);
  }
}
