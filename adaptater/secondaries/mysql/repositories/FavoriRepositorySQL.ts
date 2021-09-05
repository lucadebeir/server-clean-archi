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
          where: { id: { [Op.in]: data.idsCategories } },
        },
        {
          model: UseIngredientSequelize,
          attributes: ["quantity"],
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
      order: [[data.popular ? "number_views" : "date", "desc"]],
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
        id_recipe: favori.id_recipe,
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
        id: favoriToCreate.id_recipe,
      },
    }).then((recipe) => {
      if (recipe?.number_favorites) {
        RecipeSequelize.update(
          { number_favorites: recipe.number_favorites + 1 },
          { where: { id: favoriToCreate.id_recipe } }
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
          attributes: ["quantity"],
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
      order: [["date", "DESC"]],
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

  findByIdUserPerToCategory(pseudo: any, idCategorie: any): Promise<Recipe[]> {
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
            id: idCategorie,
          },
        },
      ],
      order: [["date", "DESC"]],
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
        id_recipe: favori.id_recipe,
        pseudo: favori.pseudo,
      },
    });
    return RecipeSequelize.findOne({
      where: {
        id: favori.id_recipe,
      },
    })
      .then((recipe) => {
        if (recipe?.number_favorites) {
          RecipeSequelize.update(
            {
              number_favorites: recipe.number_favorites - 1,
            },
            {
              where: {
                id: favori.id_recipe,
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
