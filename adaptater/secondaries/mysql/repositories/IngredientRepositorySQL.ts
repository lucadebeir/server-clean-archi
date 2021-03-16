import { QueryTypes, Op } from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import ingredient from "../../../primaries/rest/endpoints/Ingredient";
import db from "../config/db";
import { IngredientSequelize } from "../entities/Ingredient.model";

export default class IngredientRepositorySQL implements IngredientRepository {
  findAll(): Promise<Ingredient[]> {
    return IngredientSequelize.findAll({
      type: QueryTypes.SELECT,
    })
      .then((ingredients) => {
        if (ingredients.length != 0) {
          return ingredients;
        } else {
          throw new Error("Il n'y a pas d'ingrédients");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(id: any): Promise<Ingredient> {
    return IngredientSequelize.findOne({
      where: {
        idIngredient: id,
      },
    })
      .then((ingredient) => {
        if (ingredient) {
          return ingredient;
        } else {
          throw new Error("Il n'y a pas d'ingrédient.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findRestOfIngredientsPerToList(ingredients: any): Promise<Ingredient[]> {
    return IngredientSequelize.findAll({
      order: [["idIngredient", "ASC"]],
      where: {
        idIngredient: { [Op.notIn]: ingredients },
      },
    })
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new Error("Il n'y a pas d'ingrédient.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findIngredientsNotInRecipe(id: any): Promise<Ingredient[]> {
    return db.sequelize
      .query(
        "SELECT * FROM ingredient WHERE ingredient.idIngredient NOT IN (SELECT ingredient.idIngredient FROM ingredient INNER JOIN recettes INNER JOIN utiliserIngredients INNER JOIN unites WHERE ingredient.idIngredient = utiliserIngredients.idIngredient AND utiliserIngredients.idRecette = ? AND utiliserIngredients.idRecette = recettes.idRecette AND unites.idUnite = utiliserIngredients.idUnite) ORDER BY nomIngredient",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      )
      .then((ingredients) => {
        if (ingredients) {
          return ingredients;
        } else {
          throw new Error("Il n'y a pas d'ingrédient.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
