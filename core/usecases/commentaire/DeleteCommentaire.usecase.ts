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
    await this.checkBusinessRules(commentaire, token);
    return await this.commentaireRepository.deleteById(
      commentaire.id
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
          if (token.pseudo === commentaire.pseudo) {
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

  private async underCheckBusinessRules(
    commentaire: Commentaire,
    token: TokenDomain
  ): Promise<void> {
    if (await this.userRepository.existByPseudo(token.pseudo)) {
      if (commentaire.id) {
        if (!this.commentaireRepository.existById(commentaire.id)) {
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
