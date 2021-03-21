import { UserRepository } from "../../ports/repositories/User.repository";

export default class CheckValideTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: any): Promise<string> {
    return this.userRepository.checkValideToken(token);
  }
}
