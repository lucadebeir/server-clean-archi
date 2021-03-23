import { Op, QueryTypes } from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import Shopping from "../../../../core/domain/Shopping";
import ShoppingRepository from "../../../../core/ports/repositories/Shopping.repository";
import db from "../config/db";
import IngredientSequelize from "../entities/Ingredient.model";
import ShoppingSequelize from "../entities/Shopping.model";

export default class ShoppingRepositorySQL implements ShoppingRepository {
  findById(pseudo: any): Promise<Shopping[]> {
    return ShoppingSequelize.findAll({
      where: {
        pseudo: pseudo,
      },
      order: [["nomIngredient", "ASC"]],
      type: QueryTypes.SELECT,
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

  addIngredientToShoppingList(pseudo: any, name: string): Promise<string> {
    const listeCourseData = {
      pseudo: pseudo,
      nomIngredient: name,
    };
    return ShoppingSequelize.findOne({
      where: {
        pseudo: pseudo,
        nomIngredient: name,
      },
    })
      .then((ingredient) => {
        if (!ingredient) {
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
        } else {
          throw new Error(
            "Cet ingrédient se trouve déjà dans votre liste de course : " + name
          );
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
          nomIngredient: list[i].nomIngredient,
        };

        return ShoppingSequelize.findOne({
          where: {
            pseudo: pseudo,
            nomIngredient: list[i].nomIngredient,
          },
        })
          .then((ingredient) => {
            if (!ingredient) {
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
            } else {
              throw new Error(
                "Cet ingrédient se trouve déjà dans votre liste de course : " +
                  list[i].nomIngredient
              );
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

  deleteById(id: any, pseudo: any): Promise<string> {
    return ShoppingSequelize.destroy({
      where: {
        nomIngredient: id,
        pseudo: pseudo,
      },
    })
      .then(() => {
        return "Ingredient deleted!";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
