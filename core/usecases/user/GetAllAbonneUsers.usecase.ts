import TokenDomain from "../../domain/Token.domain";
import User from "../../domain/User";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllAbonneUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token?: TokenDomain): Promise<User[]> {
    this.checkBusinessRules(token);
    return this.userRepository.findAllAbonneUsers();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
