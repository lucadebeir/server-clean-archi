import { Op, QueryTypes } from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import Shopping from "../../../../core/domain/Shopping";
import ShoppingRepository from "../../../../core/ports/repositories/Shopping.repository";
import IngredientSequelize from "../entities/Ingredient.model";
import ShoppingSequelize from "../entities/Shopping.model";
import UnitySequelize from "../entities/Unity.model";

export default class ShoppingRepositorySQL implements ShoppingRepository {
  exist(pseudo: any, name: any): Promise<boolean> {
    return ShoppingSequelize.findOne({
      where: {
        pseudo: pseudo,
        nomIngredient: name,
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

  findById(pseudo: any): Promise<Shopping[]> {
    return ShoppingSequelize.findAll({
      where: {
        pseudo: pseudo,
      },
      order: [["nomIngredient", "ASC"]],
      type: QueryTypes.SELECT,
      include: [
        {
          model: IngredientSequelize,
          required: false,
        },
        {
          model: UnitySequelize,
          required: false,
        },
      ],
    })
      .then((list) => {
        if (list.length != 0) {
          return list;
        } else {
          throw new Error("Il n'y a pas d'ingrédients dans votre liste");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findIngredientsNotInShoppingListById(pseudo: any): Promise<Ingredient[]> {
    return ShoppingSequelize.findAll({
      where: {
        pseudo: pseudo,
      },
    })
      .then((data: any) => {
        let array = data.map((item: any) =>
          item.idIngredient ? item.idIngredient : ""
        );
        return IngredientSequelize.findAll({
          where: {
            idIngredient: {
              [Op.notIn]: array,
            },
          },
        });
      })
      .then((ingredients) => {
        if (ingredients.length != 0) {
          return ingredients;
        } else {
          throw new Error(
            "Tous les ingrédients sont dans votre liste de course"
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  addIngredientToShoppingList(shopping: Shopping): Promise<string> {
    const listeCourseData = {
      pseudo: shopping.pseudo,
      nomIngredient: shopping.nomIngredient,
    };
    return ShoppingSequelize.create(listeCourseData)
      .then((shopping) => {
        if (shopping) {
          return "L'ingrédient a bien été ajouté";
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async addIngredientsOfRecipeToShoppingList(
    pseudo: any,
    list: any
  ): Promise<any> {
    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        const listeCourseData = {
          pseudo: pseudo,
          idIngredient: list[i].idIngredient,
          nomIngredient: list[i].nomIngredient,
        };

        return ShoppingSequelize.create(listeCourseData)
          .then((shopping) => {
            if (shopping) {
              return "Les ingrédients de la recette ont bien été ajouté";
            } else {
              throw new Error("Problème technique");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    } else {
      throw new Error("Problème technique");
    }
  }

  deleteById(id: any): Promise<string> {
    return ShoppingSequelize.destroy({
      where: {
        idIngredientList: id,
      },
    })
      .then(() => {
        return "Ingredient supprimé avec succès !";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
