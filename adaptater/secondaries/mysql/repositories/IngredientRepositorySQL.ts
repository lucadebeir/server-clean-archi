import { QueryTypes, Op } from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientSequelize from "../entities/Ingredient.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";

export default class IngredientRepositorySQL implements IngredientRepository {
  existById(id: any): Promise<boolean> {
    return IngredientSequelize.findOne({
      where: {
        idIngredient: id,
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

  checkExistInRecipes(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  checkExistByName(name: any): Promise<boolean> {
    return IngredientSequelize.findOne({
      where: {
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

  create(ingredientToCreate: Ingredient): Promise<Ingredient> {
    return IngredientSequelize.findOne({
      where: {
        nomIngredient: ingredientToCreate.nomIngredient,
      },
    })
      .then((ingredient) => {
        if (!ingredient) {
          return IngredientSequelize.create(ingredientToCreate)
            .then((ingredientCreate) => {
              if (ingredientCreate) {
                return ingredientCreate;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet ingrédient existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

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
    return IngredientSequelize.findAll({
      attributes: ["idIngredient"],
      raw: true,
      include: [
        {
          model: UseIngredientSequelize,
          required: true,
          where: {
            idRecette: id,
          },
          attributes: [],
        },
      ],
    })
      .then((data: any) => {
        let array = data.map((item: any) => item.idIngredient);
        return IngredientSequelize.findAll({
          where: {
            idIngredient: {
              [Op.notIn]: array,
            },
          },
        });
      })
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

  deleteById(id: any): Promise<string> {
    return IngredientSequelize.destroy({
      where: {
        idIngredient: id,
      },
    })
      .then(() => {
        return "L'ingrédient a bien été supprimé";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(ingredientToUpdate: Ingredient): any {
    return IngredientSequelize.findOne({
      where: {
        nomIngredient: ingredientToUpdate.nomIngredient,
      },
    })
      .then((ingredient) => {
        if (!ingredient) {
          return IngredientSequelize.update(
            { nomIngredient: ingredientToUpdate.nomIngredient },
            { where: { idIngredient: ingredientToUpdate.idIngredient } }
          )
            .then((ingredient) => {
              if (ingredient) {
                return ingredientToUpdate;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet ingrédient existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
