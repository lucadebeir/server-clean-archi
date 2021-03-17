import Commentaire from "../../../../core/domain/Commentaire";
import CommentaireRepository from "../../../../core/ports/repositories/Commentaire.repository";
import { CommentaireSequelize } from "../entities/Commentaire.model";

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
        concerne: id,
        parent: 0,
      },
      order: [["dateCommentaire", "DESC"]],
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
        concerne: id,
        parent: idCommentaire,
      },
      order: [["dateCommentaire", "ASC"]],
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
        ecritPar: id,
      },
      order: [["dateCommentaire", "DESC"]],
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
        idCommentaire: id,
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
    return CommentaireSequelize.findOne({
      where: {
        concerne: commentaireToUpdate.concerne,
        ecritPar: commentaireToUpdate.ecritPar,
      },
    })
      .then((commentaire) => {
        if (!commentaire) {
          return CommentaireSequelize.update(
            {
              message: commentaireToUpdate.message,
            },
            {
              where: {
                concerne: commentaireToUpdate.concerne,
                ecritPar: commentaireToUpdate.ecritPar,
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
        } else {
          throw new Error("Ce commentaire existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
