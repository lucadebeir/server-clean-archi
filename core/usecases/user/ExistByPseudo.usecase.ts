import UserRepository from "../../ports/repositories/User.repository";

export default class ExistByPseudoUseCase {
  constructor(private userRepository: UserRepository) {}

  execute = async (pseudo: any): Promise<boolean> => this.userRepository.existByPseudo(pseudo);
}
