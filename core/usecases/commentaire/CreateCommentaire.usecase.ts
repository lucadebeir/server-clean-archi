import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class CreateCommentaireUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(commentaire: Commentaire): Promise<Commentaire> {
    return await this.commentaireRepository.create(commentaire);
  }
}
