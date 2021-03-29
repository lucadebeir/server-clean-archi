import User from "../../domain/User";
import UserRepository from "../../ports/repositories/User.repository";

export default class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    pseudo: any,
    oldPassword: any,
    newPassword: any,
    confirmNewPassword: any
  ): Promise<User> {
    return this.userRepository.updatePassword(
      pseudo,
      oldPassword,
      newPassword,
      confirmNewPassword
    );
  }
}
