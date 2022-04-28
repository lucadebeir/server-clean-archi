import Recipe from "../../../../core/domain/Recipe";
import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import MenuSequelize from "../entities/Menu.model";
import RecipeSequelize from "../entities/Recipe.model";
import ImageSequelize from "../entities/Image.model";
import CategorySequelize from "../entities/Category.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class MenuRepositorySQL implements MenuRepository {
  existById = (id: any): Promise<boolean> => MenuSequelize.findOne({
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

  findMenu = (): Promise<Recipe[]> => RecipeSequelize.findAll({
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
        let result: Recipe[] = menu.map(recipe => recipe.dataValues);
        return result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });

  findById = (id: any): Promise<Recipe> => RecipeSequelize.findOne({
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

  updateById = (id: any, id_recipe: any): Promise<string> => MenuSequelize.update(
      {id_recipe: id_recipe},
      {where: {id: id}}
  )
      .then((recipe: any) => {
        return recipe;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
}
