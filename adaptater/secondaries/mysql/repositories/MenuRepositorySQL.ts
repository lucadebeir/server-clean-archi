import Menu from "../../../../core/domain/Menu";
import Recipe from "../../../../core/domain/Recipe";
import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import MenuSequelize from "../entities/Menu.model";
import RecipeSequelize from "../entities/Recipe.model";
import ImageSequelize from "../entities/Image.model";
import CategorySequelize from "../entities/Category.model";

export default class MenuRepositorySQL implements MenuRepository {
  findMenu(): Promise<Menu> {
    return RecipeSequelize.findAll({
      include: [
        {
          model: MenuSequelize,
          attributes: ["idMenu"],
          required: true,
        },
      ],
    })
      .then((menu: any) => {
        if (menu) {
          return menu;
        } else {
          throw new Error("Pas de recettes disponibles dans le menu");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(id: any): Promise<Recipe> {
    return RecipeSequelize.findOne({
      include: [
        {
          model: MenuSequelize,
          attributes: ["idMenu"],
          required: true,
          where: {
            idMenu: id,
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
        if (recipe) {
          return recipe;
        } else {
          throw new Error("Mauvais identifiant");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateById(id: any, idRecette: any): Promise<string> {
    return MenuSequelize.findOne({
      where: {
        idMenu: id,
      },
    })
      .then((menu: any) => {
        if (menu) {
          return MenuSequelize.update(
            { idRecette: idRecette },
            { where: { idMenu: id } }
          )
            .then((recipe: any) => {
              return recipe;
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error("Mauvais identifiant");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
