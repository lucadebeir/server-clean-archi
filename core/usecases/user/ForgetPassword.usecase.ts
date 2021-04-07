import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class ForgetPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any): Promise<string> {
    this.checkBusinessRules(email);
    return this.userRepository.forgetPassword(email);
  }

  private checkBusinessRules(email: any): void {
    if (email) {
      if (!this.userRepository.existByEmail(email)) {
        throw new BusinessException("L'utilisateur n'existe pas");
      }
    } else {
      throw new BusinessException("L'email est obligatoire");
    }
  }
}
