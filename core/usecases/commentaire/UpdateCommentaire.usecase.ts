import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class UpdateCommentaireUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(commentaire: Commentaire): Promise<Commentaire> {
    return await this.commentaireRepository.update(commentaire);
  }
}
