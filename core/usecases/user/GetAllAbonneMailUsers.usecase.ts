import TokenDomain from "../../domain/Token.domain";
import { TechnicalException } from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import { isAdmin } from "../../utils/token.service";

export default class GetAllAbonneMailUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token?: TokenDomain): Promise<{ name: any; address: any }[]> {
    this.checkBusinessRules(token);
    return this.userRepository.findAllAbonneMailUsers();
  }

  private checkBusinessRules(token?: TokenDomain): void {
    if (!token || !isAdmin(token)) {
      throw new TechnicalException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
