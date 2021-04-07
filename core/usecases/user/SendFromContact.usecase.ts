import { BusinessException } from "../../exceptions/BusinessException";
import UserRepository from "../../ports/repositories/User.repository";

export default class SendFromContactUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: any, subject: any, message: any): Promise<string> {
    this.checkBusinessRules(email, subject, message);
    return this.userRepository.sendFromContact(email, subject, message);
  }

  private checkBusinessRules(email: any, subject: any, message: any): void {
    if (email) {
      if (!subject) {
        throw new BusinessException("Le champ pour l'objet est obligatoire");
      } else {
        if (!message) {
          throw new BusinessException(
            "Le champ pour le message est obligatoire"
          );
        }
      }
    } else {
      throw new BusinessException("Le champ pour le mail est obligatoire");
    }
  }
}
