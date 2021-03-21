import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetAllExistingPseudoUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<string[]> {
    return this.userRepository.findAllExistingPseudo();
  }
}
