import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import db from "../config/db";
import { col, Op, QueryTypes } from "sequelize";
import RecipeSequelize from "../entities/Recipe.model";
import Category from "../../../../core/domain/Category";
import Ingredient from "../../../../core/domain/Ingredient";
import CategorySequelize from "../entities/Category.model";
import IngredientSequelize from "../entities/Ingredient.model";
import ImageSequelize from "../entities/Image.model";
import { UnitySequelize } from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import ClassifyInSequelize from "../entities/ClassifyIn.model";

export default class RecipeRepositorySQL implements RecipeRepository {
  findAll(order: string): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: CategorySequelize,
          //attributes: ["libelleCategorie"],
          as: "categories",
          required: true,
          through: {
            attributes: []
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
            }
          ]
        },
        {
          model: ImageSequelize,
          as: "images",
          required: true,
          through: {
            attributes: [],
          },
        },
      ],
      order: [["datePublication", order]],
      group: "idRecette",
      limit: 20,
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

  findById(id: any): Promise<Recipe> {
    return RecipeSequelize.findOne({
      where: {
        idRecette: id,
      },
      include: [
        {
          model: CategorySequelize,
          as: "categories",
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
            }, 
            {
              model: UnitySequelize,
            }
          ]
        },
        {
          model: ImageSequelize,
          as: "images",
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((recipe: any) => {
        if (recipe) {
          return recipe;
        } else {
          throw new Error("Il n'y a pas de recette avec l'identifiant " + id);
        }
      })
      .catch((err: string | undefined) => {
        throw new Error(err);
      });
  }

  findAllPerToNbView(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: CategorySequelize,
          as: "categories",
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
            }, 
            {
              model: UnitySequelize,
            }
          ]
        },
        {
          model: ImageSequelize,
          as: "images",
          through: {
            attributes: [],
          },
        },
      ],
      order: [["nbVues", "DESC"]],
    })
      .then((recipes) => {
        if (recipes.length != 0) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getIngredientsByIdRecipe(id: any): Promise<Ingredient[]> {
    return UseIngredientSequelize.findAll({
      where: {
        idRecette: id
      },
      attributes: ["qte"],
      include: [
        {
          model: IngredientSequelize
        }, 
        {
          model: UnitySequelize,
        }
      ]
    })
    .then((ingredients) => {
        if (ingredients.length != 0) {
          return ingredients;
        } else {
          throw new Error("Cette recette n'a pas d'ingrédients !");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getCategoriesByIdRecipe(id: any): Promise<Category[]> {
    return CategorySequelize.findAll({
      include: [
        {
          model: ClassifyInSequelize,
          where: {
            idRecette: id
          },
          attributes: []
        }
      ]
    })
      .then((categories) => {
        if (categories.length != 0) {
          return categories;
        } else {
          throw new Error("Cette recette n'a pas de catégories !");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getLatestRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: CategorySequelize,
          as: "categories",
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
            }, 
            {
              model: UnitySequelize,
            }
          ]
        },
        {
          model: ImageSequelize,
          as: "images",
          through: {
            attributes: [],
          },
        },
      ],
      order: [["datePublication", "DESC"]],
      limit: 3
    })
      .then((recipes) => {
        if (recipes.length != 0) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getMostPopularRecipes(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: CategorySequelize,
          as: "categories",
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
            }, 
            {
              model: UnitySequelize,
            }
          ]
        },
        {
          model: ImageSequelize,
          as: "images",
          through: {
            attributes: [],
          },
        },
      ],
      order: [["nbVues", "DESC"]],
      limit: 12
    })
      .then((recipes) => {
        if (recipes.length != 0) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateNbView(id: any): Promise<string> {
    return RecipeSequelize.findOne({
      where: {
        idRecette: id,
      },
    }).then((recipe: any) => {
      if (!recipe) {
        throw new Error("Problème technique");
      } else {
        return RecipeSequelize.update(
          { nbVues: recipe.nbVues + 1 },
          { where: { idRecette: id } }
        )
          .then((recipe: any) => {
            if (recipe) {
              return "Nombre de vues bien incrémenté";
            } else {
              throw new Error("Problème technique");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    });
  }

  deleteById(id: any): Promise<string> {
    return RecipeSequelize.destroy({
      where: {
        idRecette: id,
      },
    })
      .then(() => {
        return "Recette supprimée!";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  create(recipe: Recipe): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  
  insertIngredientsAndCategories(
    id: any,
    categories: Category[]
  ): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
}
