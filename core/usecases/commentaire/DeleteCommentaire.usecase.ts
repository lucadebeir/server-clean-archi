import CommentaireRepository from "../../ports/repositories/Commentaire.repository";

export default class DeleteCommentaireUseCase {
  constructor(private commentaireRepository: CommentaireRepository) {}

  async execute(id: any): Promise<string> {
    return await this.commentaireRepository.deleteById(id);
  }
}
