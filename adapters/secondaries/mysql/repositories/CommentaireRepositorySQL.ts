import Commentaire from "../../../../core/domain/Commentaire";
import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import CommentaireSequelize from "../entities/Commentaire.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class CommentaireRepositorySQL implements CommentaireRepository {
  create(commentaire: Commentaire): Promise<Commentaire> {
    return CommentaireSequelize.create(commentaire)
      .then((resultats) => {
        return resultats;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findAllCommentairesByIdRecipe(id: any): Promise<Commentaire[]> {
    return CommentaireSequelize.findAll({
      where: {
        id_recipe: id,
        parent: 0,
      },
      order: [["date", "DESC"]],
    })
      .then((commentaires) => {
        return commentaires;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findAllChildrenCommentairesByIdRecette(id: any, id_commentaire: any): Promise<Commentaire[]> {
    return CommentaireSequelize.findAll({
      where: {
        id_recipe: id,
        parent: id_commentaire,
      },
      order: [["date", "ASC"]],
    })
      .then((commentaires) => {
        return commentaires;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findAllCommentairesByIdUser(pseudo: any): Promise<Commentaire[]> {
    return CommentaireSequelize.findAll({
      where: {
        pseudo: pseudo,
      },
      order: [["date", "DESC"]],
    })
      .then((commentaires) => {
        return commentaires;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  deleteById(id: any): Promise<string> {
    return CommentaireSequelize.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        return "Comment deleted!";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  update(commentaireToUpdate: Commentaire): Promise<Commentaire> {
    return CommentaireSequelize.update(
      {
        message: commentaireToUpdate.message,
      },
      {
        where: {
          id_recipe: commentaireToUpdate.id_recipe,
          pseudo: commentaireToUpdate.pseudo,
        },
      }
    )
      .then((commentaire) => {
        return commentaireToUpdate;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  existById(id: any): Promise<boolean> {
    return CommentaireSequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((result: any) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
