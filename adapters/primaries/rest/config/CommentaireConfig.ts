import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateCommentaireUseCase from "../../../../core/usecases/commentaire/CreateCommentaire.usecase";
import DeleteCommentaireUseCase from "../../../../core/usecases/commentaire/DeleteCommentaire.usecase";
import GetAllChildrenCommentairesByIdRecipeUseCase
    from "../../../../core/usecases/commentaire/GetAllChildrenCommentairesByIdRecipe.usecase";
import GetAllCommentairesByIdRecipeUseCase
    from "../../../../core/usecases/commentaire/GetAllCommentairesByIdRecipe.usecase";
import GetAllCommentairesByIdUserUseCase
    from "../../../../core/usecases/commentaire/GetAllCommentairesByIdUser.usecase";
import UpdateCommentaireUseCase from "../../../../core/usecases/commentaire/UpdateCommentaire.usecase";
import CommentaireRepositorySQL from "../../../secondaries/mysql/repositories/CommentaireRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class CommentaireConfig {
  private commentaireRepository: CommentaireRepository = new CommentaireRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();

  public getAllCommentairesByIdRecipe(): GetAllCommentairesByIdRecipeUseCase {
    return new GetAllCommentairesByIdRecipeUseCase(
      this.commentaireRepository,
      this.recipeRepository
    );
  }

  public getAllChildrenCommentairesByIdRecipe(): GetAllChildrenCommentairesByIdRecipeUseCase {
    return new GetAllChildrenCommentairesByIdRecipeUseCase(
      this.commentaireRepository,
      this.recipeRepository
    );
  }

  public getAllCommentairesByIdUser(): GetAllCommentairesByIdUserUseCase {
    return new GetAllCommentairesByIdUserUseCase(
      this.commentaireRepository,
      this.userRepository
    );
  }

  public createCommentaireUseCase(): CreateCommentaireUseCase {
    return new CreateCommentaireUseCase(
      this.commentaireRepository,
      this.userRepository,
      this.recipeRepository
    );
  }

  public updateCommentaireUseCase(): UpdateCommentaireUseCase {
    return new UpdateCommentaireUseCase(
      this.commentaireRepository,
      this.userRepository,
      this.recipeRepository
    );
  }

  public deleteCommentaireUseCase(): DeleteCommentaireUseCase {
    return new DeleteCommentaireUseCase(
      this.commentaireRepository,
      this.userRepository
    );
  }
}
