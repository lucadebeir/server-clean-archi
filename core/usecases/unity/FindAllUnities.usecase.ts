import Token from "../../domain/Token";
import Unity from "../../domain/Unity";
import {BusinessException} from "../../exceptions/BusinessException";
import UnityRepository from "../../ports/repositories/Unity.repository";
import {isLogin} from "../../utils/token.service";

export default class FindAllUnitiesUsecase {
  constructor(private unityRepository: UnityRepository) {}

  execute = async (user: Token): Promise<Unity[]> => {
    this.checkBusinessRules(user);
    return await this.unityRepository.findAll();
  };

  private checkBusinessRules = (user: Token): void => {
    if (!isLogin(user)) {
      throw new BusinessException("Vous n'avez pas le droit d'accéder à cette ressource");
    }
  };
}
