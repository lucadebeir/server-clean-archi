import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import CreateCommentaireUseCase from "../../../../core/usecases/commentaire/CreateCommentaire.usecase";
import DeleteCommentaireUseCase from "../../../../core/usecases/commentaire/DeleteCommentaire.usecase";
import GetAllChildrenCommentairesByIdRecipeUseCase from "../../../../core/usecases/commentaire/GetAllChildrenCommentairesByIdRecipe.usecase";
import GetAllCommentairesByIdRecipeUseCase from "../../../../core/usecases/commentaire/GetAllCommentairesByIdRecipe.usecase";
import GetAllCommentairesByIdUserUseCase from "../../../../core/usecases/commentaire/GetAllCommentairesByIdUser.usecase";
import UpdateCommentaireUseCase from "../../../../core/usecases/commentaire/UpdateCommentaire.usecase";
import CommentaireRepositorySQL from "../../../secondaries/mysql/repositories/CommentaireRepositorySQL";

export default class CommentaireConfig {
  public commentaireRepository: CommentaireRepository = new CommentaireRepositorySQL();

  public getAllCommentairesByIdRecipe(): GetAllCommentairesByIdRecipeUseCase {
    return new GetAllCommentairesByIdRecipeUseCase(this.commentaireRepository);
  }

  public getAllChildrenCommentairesByIdRecipe(): GetAllChildrenCommentairesByIdRecipeUseCase {
    return new GetAllChildrenCommentairesByIdRecipeUseCase(
      this.commentaireRepository
    );
  }

  public getAllCommentairesByIdUser(): GetAllCommentairesByIdUserUseCase {
    return new GetAllCommentairesByIdUserUseCase(this.commentaireRepository);
  }

  public createCommentaireUseCase(): CreateCommentaireUseCase {
    return new CreateCommentaireUseCase(this.commentaireRepository);
  }

  public updateCommentaireUseCase(): UpdateCommentaireUseCase {
    return new UpdateCommentaireUseCase(this.commentaireRepository);
  }

  public deleteCommentaireUseCase(): DeleteCommentaireUseCase {
    return new DeleteCommentaireUseCase(this.commentaireRepository);
  }
}
