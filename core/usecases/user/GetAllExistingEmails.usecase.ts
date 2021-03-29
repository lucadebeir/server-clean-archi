import UserRepository from "../../ports/repositories/User.repository";

export default class GetAllExistingEmailsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<string[]> {
    return this.userRepository.findAllExistingEmails();
  }
}
