import Recipe from "../../../../core/domain/Recipe";
import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import MenuSequelize from "../entities/Menu.model";
import RecipeSequelize from "../entities/Recipe.model";
import ImageSequelize from "../entities/Image.model";
import CategorySequelize from "../entities/Category.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class MenuRepositorySQL implements MenuRepository {
  existById(id: any): Promise<boolean> {
    return MenuSequelize.findOne({
      where: {
        id: id,
      },
    })
      .then((result: any) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findMenu(): Promise<Recipe[]> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: MenuSequelize,
          attributes: ["id"],
          required: true,
        },
        {
          model: ImageSequelize,
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: CategorySequelize,
          as: "categories",
          required: true,
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((menu: any) => {
        return menu;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  findById(id: any): Promise<Recipe> {
    return RecipeSequelize.findOne({
      include: [
        {
          model: MenuSequelize,
          attributes: ["id"],
          required: true,
          where: {
            id: id,
          },
        },
        {
          model: ImageSequelize,
          required: true,
          through: {
            attributes: [],
          },
        },
        {
          model: CategorySequelize,
          as: "categories",
          required: true,
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((recipe: any) => {
        return recipe;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  updateById(id: any, id_recipe: any): Promise<string> {
    return MenuSequelize.update(
      { id_recipe: id_recipe },
      { where: { id: id } }
    )
      .then((recipe: any) => {
        return recipe;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
