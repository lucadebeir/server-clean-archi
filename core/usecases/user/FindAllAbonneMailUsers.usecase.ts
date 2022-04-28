import Token from "../../domain/Token";
import {TechnicalException} from "../../exceptions/TechnicalException";
import UserRepository from "../../ports/repositories/User.repository";
import {isAdmin} from "../../utils/token.service";

export default class FindAllAbonneMailUsersUsecase {
  constructor(private userRepository: UserRepository) {}

  execute = async (token?: Token): Promise<{ name: any; address: any }[]> => {
    this.checkBusinessRules(token);
    return this.userRepository.findAllAbonneMailUsers();
  };

  private checkBusinessRules = (token?: Token): void => {
    if (!token || !isAdmin(token)) throw new TechnicalException("Vous n'avez pas le droit d'accéder à cette ressource");
  };
}
