import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import UserRepository from "../../../../core/ports/repositories/User.repository";
import CreateCommentaireUseCase from "../../../../core/usecases/commentaire/CreateCommentaire.usecase";
import DeleteCommentaireUseCase from "../../../../core/usecases/commentaire/DeleteCommentaire.usecase";
import FindAllChildrenCommentairesByIdRecipeUsecase
    from "../../../../core/usecases/commentaire/FindAllChildrenCommentairesByIdRecipe.usecase";
import FindAllCommentairesByIdRecipeUsecase
    from "../../../../core/usecases/commentaire/FindAllCommentairesByIdRecipe.usecase";
import FindAllCommentairesByIdUserUsecase
    from "../../../../core/usecases/commentaire/FindAllCommentairesByIdUser.usecase";
import UpdateCommentaireUseCase from "../../../../core/usecases/commentaire/UpdateCommentaire.usecase";
import CommentaireRepositorySQL from "../../../secondaries/mysql/repositories/CommentaireRepositorySQL";
import RecipeRepositorySQL from "../../../secondaries/mysql/repositories/RecipeRepositorySQL";
import UserRepositorySQL from "../../../secondaries/mysql/repositories/UserRepositorySQL";

export default class CommentaireConfig {
  private commentaireRepository: CommentaireRepository = new CommentaireRepositorySQL();
  private recipeRepository: RecipeRepository = new RecipeRepositorySQL();
  private userRepository: UserRepository = new UserRepositorySQL();

  public getAllCommentairesByIdRecipe(): FindAllCommentairesByIdRecipeUsecase {
    return new FindAllCommentairesByIdRecipeUsecase(
      this.commentaireRepository,
      this.recipeRepository
    );
  }

  public getAllChildrenCommentairesByIdRecipe(): FindAllChildrenCommentairesByIdRecipeUsecase {
    return new FindAllChildrenCommentairesByIdRecipeUsecase(
      this.commentaireRepository,
      this.recipeRepository
    );
  }

  public getAllCommentairesByIdUser(): FindAllCommentairesByIdUserUsecase {
    return new FindAllCommentairesByIdUserUsecase(
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
