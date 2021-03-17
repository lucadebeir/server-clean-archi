import Commentaire from "../../domain/Commentaire";
import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class GetAllCommentairesByIdUserUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(id: any): Promise<Commentaire[]> {
    return await this.commentaireRepository.findAllCommentairesByIdUser(id);
  }
}
