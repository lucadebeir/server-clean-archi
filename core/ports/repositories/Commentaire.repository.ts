import Commentaire from "../../domain/Commentaire";

export default interface CommentaireRepository {
  create(commentaire: Commentaire): Promise<Commentaire>;
  findAllCommentairesByIdRecipe(idRecette: any): Promise<Commentaire[]>;
  findAllChildrenCommentairesByIdRecette(
    idRecette: any,
    idCommentaire: any
  ): Promise<Commentaire[]>;
  findAllCommentairesByIdUser(idUser: any): Promise<Commentaire[]>;

  deleteById(id: any): Promise<string>;
  update(commentaire: Commentaire): Promise<Commentaire>;

  existById(id: any): Promise<boolean>;
}
