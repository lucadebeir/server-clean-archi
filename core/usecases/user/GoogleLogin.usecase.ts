import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class GoogleLoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: any): Promise<Token> {
    this.checkBusinessRules(token);
    return this.userRepository.gLogin(token);
  }

  private checkBusinessRules(token: any): void {
    if (!token) {
      throw new BusinessException("Il manque le token fourni par Google");
    }
  }
}
