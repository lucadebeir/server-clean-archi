import {Op, QueryTypes} from "sequelize";
import Category from "../../../../core/domain/Category";
import Recipe from "../../../../core/domain/Recipe";
import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import CategorySequelize from "../entities/Category.model";
import ClassifyInSequelize from "../entities/ClassifyIn.model";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class CategoryRepositorySQL implements CategoryRepository {
  create(categoryToCreate: Category): Promise<Category> {
    return CategorySequelize.create(categoryToCreate)
      .then((categoryCreate) => {
        return categoryCreate;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findAll(): Promise<Category[]> {
    return CategorySequelize.findAll({
      type: QueryTypes.SELECT,
    })
      .then((categories) => {
        return categories;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
        let array = data.map((item: Category) => item.id);
        return CategorySequelize.findAll({
          where: {
            id: {
              [Op.notIn]: array,
            },
          },
        });
      })
      .then((categories) => {
        return categories;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
            id: id,
          },
          attributes: [],
        },
      ],
      order: [["date", "DESC"]],
    })
      .then((recipes) => {
       return recipes;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
        return recipes;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
        throw new TechnicalException(err.message);
      });
  }

  update(categoryToUpdate: Category): Promise<Category> {
    return CategorySequelize.update(
      { name: categoryToUpdate.name },
      { where: { id: categoryToUpdate.id } }
    )
      .then((category) => {
        return categoryToUpdate;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
        throw new TechnicalException(err.message);
      });
  }

  existById(id: any): Promise<boolean> {
    return CategorySequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((category) => {
        console.log(category)
        return true;
      })
      .catch((err) => {
        console.error(err.message);
        throw new TechnicalException(err.message);
      });
  }

  checkExistByName(name: any): Promise<boolean> {
    return CategorySequelize.findOne({
      where: {
        name: name,
      },
    })
      .then((category) => {
        return !!category;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
