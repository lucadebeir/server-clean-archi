import {BusinessException} from "../../exceptions/BusinessException";
import MailingRepository from "../../ports/mailing/Mailing.repository";
import UserRepository from "../../ports/repositories/User.repository";

export default class SendFromContactUseCase {
  constructor(private userRepository: UserRepository, private mailingRepository: MailingRepository) {}

  execute = async (email: any, subject: any, message: any): Promise<void> => {
    this.checkBusinessRules(email, subject, message);

    this.mailingRepository.sendMailFromContact({email, subject, message});
  };

  private checkBusinessRules = (email: any, subject: any, message: any): void => {
    if (email) {
      if (!subject) {
        throw new BusinessException("Le champ pour l'objet est obligatoire");
      } else {
        if (!message) {
          throw new BusinessException("Le champ pour le message est obligatoire");
        }
      }
    } else {
      throw new BusinessException("Le champ pour le mail est obligatoire");
    }
  };
}
