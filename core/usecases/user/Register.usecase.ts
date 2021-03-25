import User from "../../domain/User";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User, host: any): Promise<string> {
    return this.userRepository.register(user, host);
  }
}
