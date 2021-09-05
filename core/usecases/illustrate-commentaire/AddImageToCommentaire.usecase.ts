import IllustrateCommentaireDomain from "../../domain/IllustrateCommentaire.domain";
import TokenDomain from "../../domain/Token.domain";
import { BusinessException } from "../../exceptions/BusinessException";
import { TechnicalException } from "../../exceptions/TechnicalException";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";
import IllustrateCommentaireRepository from "../../ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../ports/repositories/Image.repository";
import { isLogin } from "../../utils/token.service";

export default class AddImageToCommentaireUseCase {
  constructor(
    private illustrateCommentaireRepository: IllustrateCommentaireRepository,
    private imageRepository: ImageRepository,
    private commentaireRepository: CommentaireRepository
  ) {}

  async execute(
    illustrateCommentaire: IllustrateCommentaireDomain,
    token?: TokenDomain
  ): Promise<string> {
    await this.checkBusinessRules(illustrateCommentaire, token);
    return this.illustrateCommentaireRepository.addToCommentaire(
      illustrateCommentaire
    );
  }

  private async checkBusinessRules(
    illustrateCommentaire: IllustrateCommentaireDomain,
    token?: TokenDomain
  ): Promise<void> {
    if (token && isLogin(token)) {
      if (illustrateCommentaire) {
        if (
          !illustrateCommentaire.id_image ||
          await !this.imageRepository.existById(illustrateCommentaire.id_image)
        ) {
          throw new BusinessException("L'image doit exister");
        }
        if (
          !illustrateCommentaire.id_commentaire ||
          await !this.commentaireRepository.existById(
            illustrateCommentaire.id_commentaire
          )
        ) {
          throw new BusinessException("Le commentaire doit exister");
        }
        if (await this.illustrateCommentaireRepository.check(illustrateCommentaire)) {
          throw new BusinessException(
            "Cette image est déjà associé à ce commentaire"
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
