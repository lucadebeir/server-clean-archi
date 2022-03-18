import Commentaire from "../../domain/Commentaire";
import Token from "../../domain/Token";
import {BusinessException} from "../../exceptions/BusinessException";
import {TechnicalException} from "../../exceptions/TechnicalException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import UserRepository from "../../ports/repositories/User.repository";
import {isLogin} from "../../utils/token.service";

export default class GetAllCommentairesByIdUserUseCase {
  constructor(private commentaireRepository: CommentaireRepository, private userRepository: UserRepository) {}

  async execute(pseudo: any, token?: Token): Promise<Commentaire[]> {
    await this.checkBusinessRules(pseudo, token);
    return await this.commentaireRepository.findAllCommentairesByIdUser(pseudo);
  }

  private async checkBusinessRules(pseudo: any, token?: Token): Promise<void> {
    if(token && isLogin(token)) {
      if(pseudo) {
        if(await this.userRepository.existByPseudo(pseudo)) {
          if(pseudo !== token.pseudo) {
            throw new BusinessException("La personne connectée n'est pas la personne correspondant au pseudo en question")
          }
        } else {
          throw new BusinessException("L'utilisateur n'existe pas")
        }
      } else {
        throw new BusinessException("L'identifiant d'un utilisateur est obligatoire")
      }
    } else {
      throw new TechnicalException("Vous n'avez pas accès à ces ressources")
    }
  }
}
