import Commentaire from "../../../../core/domain/Commentaire";
import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import CommentaireSequelize from "../entities/Commentaire.model";

export default class CommentaireRepositorySQL implements CommentaireRepository {
  create(commentaire: Commentaire): Promise<Commentaire> {
    return CommentaireSequelize.create(commentaire)
      .then((resultats) => {
        if (resultats) {
          return resultats;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
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
        if (commentaires) {
          return commentaires;
        } else {
          throw new Error(
            "Il n'y a pas encore de commentaires pour cette recette"
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllChildrenCommentairesByIdRecette(
    id: any,
    idCommentaire: any
  ): Promise<Commentaire[]> {
    return CommentaireSequelize.findAll({
      where: {
        id_recipe: id,
        parent: idCommentaire,
      },
      order: [["date", "ASC"]],
    })
      .then((commentaires) => {
        if (commentaires) {
          return commentaires;
        } else {
          throw new Error(
            "Il n'y a pas encore de commentaires pour cette recette"
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findAllCommentairesByIdUser(id: any): Promise<Commentaire[]> {
    return CommentaireSequelize.findAll({
      where: {
        pseudo: id,
      },
      order: [["date", "DESC"]],
    })
      .then((commentaires) => {
        if (commentaires) {
          return commentaires;
        } else {
          throw new Error("Vous n'avez pas encore écrit de commentaires");
        }
      })
      .catch((err) => {
        throw new Error(err);
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
        throw new Error(err);
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
        if (commentaire) {
          return commentaireToUpdate;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  existById(id: any): Promise<boolean> {
    return CommentaireSequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((result: any) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
