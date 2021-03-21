import User from "../../domain/User";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.update(user);
  }
}
