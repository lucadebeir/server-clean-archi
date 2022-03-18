import IllustrateCommentaireRepository from "../../../../core/ports/repositories/IllustrateCommentaire.repository";
import ImageRepository from "../../../../core/ports/repositories/Image.repository";
import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import AddImageToCommentaireUseCase
    from "../../../../core/usecases/illustrate-commentaire/AddImageToCommentaire.usecase";
import UpdateImageFromCommentaireUseCase
    from "../../../../core/usecases/illustrate-commentaire/UpdateImageFromCommentaire.usecase";
import IllustrateCommentaireRepositorySQL
    from "../../../secondaries/mysql/repositories/IllustrateCommentaireRepositorySQL";
import ImageRepositorySQL from "../../../secondaries/mysql/repositories/ImageRepositorySQL";
import CommentaireRepositorySQL from "../../../secondaries/mysql/repositories/CommentaireRepositorySQL";

export default class IllustrateCommentaireConfig {
  private illustrateCommentaireRepository: IllustrateCommentaireRepository = new IllustrateCommentaireRepositorySQL();
  private imageRepository: ImageRepository = new ImageRepositorySQL();
  private commentaireRepository: CommentaireRepository = new CommentaireRepositorySQL();

  public addImageToCommentaireUseCase(): AddImageToCommentaireUseCase {
    return new AddImageToCommentaireUseCase(
      this.illustrateCommentaireRepository,
      this.imageRepository,
      this.commentaireRepository
    );
  }

  public updateImageFromCommentaireUseCase(): UpdateImageFromCommentaireUseCase {
    return new UpdateImageFromCommentaireUseCase(
      this.illustrateCommentaireRepository,
      this.imageRepository,
      this.commentaireRepository
    );
  }
}
