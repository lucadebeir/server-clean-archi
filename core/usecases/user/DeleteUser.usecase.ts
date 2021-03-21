import { UserInfo } from "os";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(pseudo: any): Promise<string> {
    return this.userRepository.deleteById(pseudo);
  }
}
