import { UserRepository } from "../../ports/repositories/User.repository";

export default class UpdatePasswordWithTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: any, newPassword: any): Promise<string> {
    return this.userRepository.updatePasswordWithToken(token, newPassword);
  }
}
