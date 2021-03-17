import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class GetAllChildrenCommentairesByIdRecipeUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(id: any, idCommentaire: any): Promise<Commentaire[]> {
    return await this.commentaireRepository.findAllChildrenCommentairesByIdRecette(
      id,
      idCommentaire
    );
  }
}
