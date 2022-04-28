import UserRepository from "../../ports/repositories/User.repository";

export default class FindAllExistingPseudoUsecase {
  constructor(private userRepository: UserRepository) {}

  execute = async (): Promise<string[]> => this.userRepository.findAllExistingPseudo();
}
