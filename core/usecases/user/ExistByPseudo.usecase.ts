import { UserRepository } from "../../ports/repositories/User.repository";

export default class ExistByPseudoUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(pseudo: any): Promise<boolean> {
    return this.userRepository.existByPseudo(pseudo);
  }
}
