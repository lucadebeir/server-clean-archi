import User from "../../domain/User";
import { UserRepository } from "../../ports/repositories/User.repository";

export default class GetAllAbonneUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAllAbonneUsers();
  }
}
