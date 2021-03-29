import UserRepository from "../../ports/repositories/User.repository";

export default class ForgetPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any): Promise<string> {
    return this.userRepository.forgetPassword(email);
  }
}
