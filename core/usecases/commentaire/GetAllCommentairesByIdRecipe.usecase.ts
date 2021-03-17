import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class GetAllCommentairesByIdRecipeUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(id: any): Promise<Commentaire[]> {
    return await this.commentaireRepository.findAllCommentairesByIdRecipe(id);
  }
}
