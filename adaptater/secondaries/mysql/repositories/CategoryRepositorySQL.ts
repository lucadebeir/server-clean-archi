import { Op, QueryTypes } from "sequelize";
import Category from "../../../../core/domain/Category.domain";
import Recipe from "../../../../core/domain/Recipe";
import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import CategorySequelize from "../entities/Category.model";
import ClassifyInSequelize from "../entities/ClassifyIn.model";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";

export default class CategoryRepositorySQL implements CategoryRepository {
  existById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  checkExistByName(name: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  create(categoryToCreate: Category): Promise<Category> {
    return CategorySequelize.findOne({
      where: {
        libelleCategorie: categoryToCreate.libelleCategorie,
      },
    })
      .then((category) => {
        if (!category) {
          return CategorySequelize.create(categoryToCreate)
            .then((categoryCreate) => {
              if (categoryCreate) {
                return categoryCreate;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet catégorie existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  findAll(): Promise<Category[]> {
    return CategorySequelize.findAll({
      type: QueryTypes.SELECT,
    })
      .then((categories) => {
        if (categories.length != 0) {
          return categories;
        } else {
          throw new Error("Il n'y a pas de categories");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findCategoriesNotInRecipe(id: any): Promise<Category[]> {
    return CategorySequelize.findAll({
      attributes: ["idCategorie"],
      raw: true,
      include: [
        {
          model: RecipeSequelize,
          where: {
            idRecette: id,
          },
          attributes: [],
        },
      ],
    })
      .then((data: any) => {
        let array = data.map((item: any) => item.idCategorie);
        return CategorySequelize.findAll({
          where: {
            idCategorie: {
              [Op.notIn]: array,
            },
          },
        });
      })
      .then((categories) => {
        if (categories) {
          return categories;
        } else {
          throw new Error("Il n'y a pas de catégories.");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getRecipesByIdCategory(id: any): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: ImageSequelize,
        },
        {
          model: CategorySequelize,
          as: "categories",
          where: {
            idCategorie: id,
          },
          attributes: [],
        },
      ],
      order: [["datePublication", "DESC"]],
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

  getRecipesByIdCategoryPerToNbView(id: any): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: ImageSequelize,
        },
        {
          model: CategorySequelize,
          as: "categories",
          where: {
            idCategorie: id,
          },
          attributes: [],
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

  deleteById(id: any): Promise<string> {
    return CategorySequelize.destroy({
      where: {
        idCategorie: id,
      },
    })
      .then(() => {
        return "Category deleted!";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(categoryToUpdate: Category): Promise<Category> {
    return CategorySequelize.findOne({
      where: {
        libelleCategorie: categoryToUpdate.libelleCategorie,
      },
    })
      .then((category) => {
        if (!category) {
          return CategorySequelize.update(
            { libelleCategorie: categoryToUpdate.libelleCategorie },
            { where: { idCategorie: categoryToUpdate.idCategorie } }
          )
            .then((category) => {
              if (category) {
                return categoryToUpdate;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Cet catégorie existe déjà");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkExistInRecipes(id: any): Promise<boolean> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: ClassifyInSequelize,
          where: {
            idCategorie: id,
          },
        },
      ],
    })
      .then((result: any) => {
        return result.length != 0;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
