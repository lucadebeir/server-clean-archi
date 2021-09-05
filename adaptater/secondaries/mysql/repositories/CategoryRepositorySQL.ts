import { Op, QueryTypes } from "sequelize";
import Category from "../../../../core/domain/Category.domain";
import Recipe from "../../../../core/domain/Recipe";
import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import CategorySequelize from "../entities/Category.model";
import ClassifyInSequelize from "../entities/ClassifyIn.model";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";

export default class CategoryRepositorySQL implements CategoryRepository {
  create(categoryToCreate: Category): Promise<Category> {
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
      attributes: ["id"],
      raw: true,
      include: [
        {
          model: RecipeSequelize,
          where: {
            id: id,
          },
          attributes: [],
        },
      ],
    })
      .then((data: any) => {
        let array = data.map((item: any) => item.idCategorie);
        return CategorySequelize.findAll({
          where: {
            id: {
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
      order: [["date", "DESC"]],
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
            id: id,
          },
          attributes: [],
        },
      ],
      order: [["number_views", "DESC"]],
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
        id: id,
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
    return CategorySequelize.update(
      { name: categoryToUpdate.name },
      { where: { id: categoryToUpdate.id } }
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
  }

  checkExistInRecipes(id: any): Promise<boolean> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: ClassifyInSequelize,
          where: {
            id_category: id,
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

  existById(id: any): Promise<boolean> {
    return CategorySequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((category) => {
        if (category) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  checkExistByName(name: any): Promise<boolean> {
    return CategorySequelize.findOne({
      where: {
        name: name,
      },
    })
      .then((category) => {
        if (category) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
