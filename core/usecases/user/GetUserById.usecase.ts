import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";

export default class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: any): Promise<User> {
    return this.userRepository.findById(id);
  }
}
