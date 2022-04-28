import UserRepository from "../../ports/repositories/User.repository";

export default class FindAllExistingEmailsUsecase {
  constructor(private userRepository: UserRepository) {}

  execute = async (): Promise<string[]> => this.userRepository.findAllExistingEmails();
}
