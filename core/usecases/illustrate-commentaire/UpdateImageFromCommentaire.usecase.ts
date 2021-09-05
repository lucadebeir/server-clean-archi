import IllustrateCommentaireDomain from "../../domain/IllustrateCommentaire.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import IllustrateCommentaireRepository from "../../ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import { isAdmin } from "../../utils/token.service";

export default class UpdateImageFromCommentaireUseCase {
  constructor(
    private illustrateCommentaireRepository: IllustrateCommentaireRepository,
    private imageRepository: ImageRepository,
    private commentaireRepository: CommentaireRepository
  ) {}

  async execute(
    illustrateCommentaire: IllustrateCommentaireDomain,
    token?: TokenDomain
  ): Promise<string> {
    this.checkBusinessRules(illustrateCommentaire, token);
    return this.illustrateCommentaireRepository.updateFromCommentaire(
      illustrateCommentaire
    );
  }

  private checkBusinessRules(
    illustrateCommentaire: IllustrateCommentaireDomain,
    token?: TokenDomain
  ): void {
    if (token && isAdmin(token)) {
      if (illustrateCommentaire) {
        if (
          !illustrateCommentaire.id_image ||
          !this.imageRepository.existById(illustrateCommentaire.id_image)
        ) {
          throw new BusinessException("L'image doit exister");
        }
        if (
          !illustrateCommentaire.id_commentaire ||
          !this.commentaireRepository.existById(
            illustrateCommentaire.id_commentaire
          )
        ) {
          throw new BusinessException("Le commentaire doit exister");
        }
        if (
          !this.illustrateCommentaireRepository.check(illustrateCommentaire)
        ) {
          throw new BusinessException(
            "Cette image n'existe pas dans ce commentaire"
          );
        }
      } else {
        throw new TechnicalException("Problème technique");
      }
    } else {
      throw new BusinessException(
        "Vous n'avez pas le droit d'accéder à cette ressource"
      );
    }
  }
}
