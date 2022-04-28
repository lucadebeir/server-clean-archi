import UserRepository from "../../ports/repositories/User.repository";

export default class CheckValideTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  execute = async (token: any): Promise<string> => this.userRepository.checkValideToken(token);
}
