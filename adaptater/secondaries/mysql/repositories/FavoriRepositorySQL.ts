import Favori from "../../../../core/domain/Favori";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import FavoriSequelize from "../entities/Favori.model";
import RecipeSequelize from "../entities/Recipe.model";
import CategorySequelize from "../entities/Category.model";
import Recipe from "../../../../core/domain/Recipe";
import EtapeSequelize from "../entities/Etape.model";
import ImageSequelize from "../entities/Image.model";
import IngredientSequelize from "../entities/Ingredient.model";
import NotationSequelize from "../entities/Notation.model";
import UnitySequelize from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import RecipesFilterDomain from "../../../../core/domain/RecipesFilter.domain";
import { Op } from "sequelize";

export default class FavoriRepositorySQL implements FavoriRepository {
  research(data: RecipesFilterDomain, pseudo: string): Promise<Recipe[]> {
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
          //attributes: ["libelleCategorie"],
          as: "categories",
          required: true,
          through: {
            attributes: [],
          },
          where: { idCategorie: { [Op.in]: data.idsCategories } },
        },
        {
          model: UseIngredientSequelize,
          attributes: ["qte"],
          required: true,
          include: [
            {
              model: IngredientSequelize,
              //attributes: ["nomIngredient"]
            },
            {
              model: UnitySequelize,
              //attributes: ["libelleUnite"]
            },
          ],
        },
        {
          model: ImageSequelize,
          as: "images",
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: EtapeSequelize,
          required: false,
        },
        {
          model: NotationSequelize,
          required: false,
          attributes: ["note"],
        },
      ],
      order: [[data.popular ? "nbVues" : "datePublication", "desc"]],
    })
      .then((recipes: any) => {
        if (recipes.length != 0) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err: string | undefined) => {
        throw new Error(err);
      });
  }

  check(favori: Favori): Promise<boolean> {
    return FavoriSequelize.findOne({
      where: {
        idRecette: favori.idRecette,
        pseudo: favori.pseudo,
      },
    })
      .then((favori) => {
        if (favori) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  create(favoriToCreate: Favori): Promise<string> {
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
  }

  findByIdUser(pseudo: any): Promise<Recipe[]> {
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
          //attributes: ["libelleCategorie"],
          as: "categories",
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: UseIngredientSequelize,
          attributes: ["qte"],
          required: true,
          include: [
            {
              model: IngredientSequelize,
              //attributes: ["nomIngredient"]
            },
            {
              model: UnitySequelize,
              //attributes: ["libelleUnite"]
            },
          ],
        },
        {
          model: ImageSequelize,
          as: "images",
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: EtapeSequelize,
          required: false,
        },
        {
          model: NotationSequelize,
          required: false,
          attributes: ["note"],
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

  deleteById(favori: Favori): Promise<string> {
    FavoriSequelize.destroy({
      where: {
        idRecette: favori.idRecette,
        pseudo: favori.pseudo,
      },
    });
    return RecipeSequelize.findOne({
      where: {
        idRecette: favori.idRecette,
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
                idRecette: favori.idRecette,
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
