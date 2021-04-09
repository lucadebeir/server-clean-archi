import Commentaire from "../../domain/Commentaire";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import UserRepository from "../../ports/repositories/User.repository";
import { isAdmin, isLogin } from "../../utils/token.service";

export default class DeleteCommentaireUseCase {
  constructor(
    private commentaireRepository: CommentaireRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    commentaire: Commentaire,
    token?: TokenDomain
  ): Promise<string> {
    this.checkBusinessRules(commentaire, token);
    return await this.commentaireRepository.deleteById(
      commentaire.idCommentaire
    );
  }

  private checkBusinessRules(
    commentaire: Commentaire,
    token?: TokenDomain
  ): void {
    if (token) {
      if (isAdmin(token)) {
        this.underCheckBusinessRules(commentaire, token);
      } else {
        if (isLogin(token)) {
          if (token.pseudo === commentaire.ecritPar) {
            this.underCheckBusinessRules(commentaire, token);
          } else {
            throw new BusinessException(
              "Ce commentaire n'est pas un des votre. Vous ne pouvez pas supprimer cette ressource"
            );
          }
        } else {
          throw new TechnicalException(
            "Vous ne pouvez pas supprimer cette ressource"
          );
        }
      }
    } else {
      throw new TechnicalException(
        "Vous ne pouvez pas supprimer cette ressource"
      );
    }
  }

  private underCheckBusinessRules(
    commentaire: Commentaire,
    token: TokenDomain
  ): void {
    if (this.userRepository.existByPseudo(token.pseudo)) {
      if (commentaire.idCommentaire) {
        if (!this.commentaireRepository.existById(commentaire.idCommentaire)) {
          throw new BusinessException("Le commentaire n'existe pas");
        }
      } else {
        throw new BusinessException("L'identifiant est obligatoire");
      }
    } else {
      throw new BusinessException("L'utilisateur n'existe pas");
    }
  }
}
