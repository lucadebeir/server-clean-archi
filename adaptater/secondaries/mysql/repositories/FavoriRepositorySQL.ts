import Favori from "../../../../core/domain/Favori";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import FavoriSequelize from "../entities/Favori.model";
import RecipeSequelize from "../entities/Recipe.model";
import CategorySequelize from "../entities/Category.model";

export default class FavoriRepositorySQL implements FavoriRepository {
  create(favoriToCreate: Favori): Promise<string> {
    return FavoriSequelize.findOne({
      where: {
        idRecette: favoriToCreate.idRecette,
        pseudo: favoriToCreate.pseudo,
      },
    })
      .then((favori) => {
        if (!favori) {
          RecipeSequelize.findOne({
            where: {
              idRecette: favoriToCreate.idRecette,
            },
          }).then((recipe) => {
            if (recipe?.nbFavoris) {
              RecipeSequelize.update(
                { nbFavoris: recipe.nbFavoris + 1 },
                { where: { idRecette: favoriToCreate.idRecette } }
              );
            } else {
              throw new Error("Cette recette n'existe pas.");
            }
          });

          return FavoriSequelize.create(favoriToCreate)
            .then((favoriCreate) => {
              if (favoriCreate) {
                return "Ajouté aux favoris !";
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cette recette est déjà dans les favoris.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findByIdUser(pseudo: any): Promise<Favori[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: FavoriSequelize,
          attributes: [],
          required: true,
          where: {
            pseudo: pseudo,
          },
        },
      ],
      order: [["datePublication", "DESC"]],
    })
      .then((favoris) => {
        if (favoris.length != 0) {
          return favoris;
        } else {
          throw new Error("Cet utilisateur n'a aucun favori");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findByIdUserPerToCategory(pseudo: any, idCategorie: any): Promise<Favori[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: FavoriSequelize,
          attributes: [],
          required: true,
          where: {
            pseudo: pseudo,
          },
        },
        {
          model: CategorySequelize,
          attributes: [],
          as: "categories",
          where: {
            idCategorie: idCategorie,
          },
        },
      ],
      order: [["datePublication", "DESC"]],
    })
      .then((favoris) => {
        if (favoris.length != 0) {
          return favoris;
        } else {
          throw new Error(
            "Cet utilisateur n'a aucun favori dans cette catégorie"
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  deleteById(id: any, pseudo: any): Promise<string> {
    FavoriSequelize.destroy({
      where: {
        idRecette: id,
        pseudo: pseudo,
      },
    });
    return RecipeSequelize.findOne({
      where: {
        idRecette: id,
      },
    })
      .then((recipe) => {
        if (recipe?.nbFavoris) {
          RecipeSequelize.update(
            {
              nbFavoris: recipe.nbFavoris - 1,
            },
            {
              where: {
                idRecette: id,
              },
            }
          );
          return "Supprimé des favoris !";
        } else {
          throw new Error("Cette recette n'existe pas.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
