import User from "../../domain/User";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.register(user);
  }
}
