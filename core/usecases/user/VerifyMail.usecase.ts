import UserRepository from "../../ports/repositories/User.repository";
import {BusinessException} from "../../exceptions/BusinessException";

export default class VerifyMailUseCase {
    constructor(private userRepository: UserRepository) {
    }

    execute = async (real_link: string, link_to_check: string, id: any, rand: number, pseudo: any): Promise<string> => {
        this.checkBusinessRules(real_link, link_to_check, id, rand);
        return await this.userRepository.verifyMail(pseudo);
    }

    checkBusinessRules(real_link: string, link_to_check: string, id: any, rand: number): void {
        if(id != rand.toString()) throw new BusinessException("Mauvaise URL");
    }
}
