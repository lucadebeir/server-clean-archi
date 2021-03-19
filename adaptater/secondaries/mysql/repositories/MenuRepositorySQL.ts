import Menu from "../../../../core/domain/Menu";
import Recipe from "../../../../core/domain/Recipe";
import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import { MenuSequelize } from "../entities/Menu.model";

export default class MenuRepositorySQL implements MenuRepository {
  findMenu(): Promise<Menu> {
    return db.sequelize
      .query(
        "SELECT idMenu, recettes.* FROM menus INNER JOIN recettes ON menus.idRecette = recettes.idRecette",
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((menu: any) => {
        if (menu) {
          console.log(menu);
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
    return db.sequelize
      .query(
        "SELECT recettes.*, images.* FROM menus, recettes, images, illustrerRecettes WHERE menus.idMenu = ? AND menus.idRecette = recettes.idRecette and illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
          raw: false,
          model: MenuSequelize,
          mapToModel: false,
        }
      )
      .then((recipe: any) => {
        if (recipe[0]) {
          return recipe[0];
        } else {
          throw new Error("Mauvais identifiant");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateById(id: any, idRecette: any): Promise<Recipe> {
    return db.sequelize
      .query("UPDATE menus SET idRecette = ?  WHERE idMenu = ?", {
        replacements: [idRecette, id],
        type: QueryTypes.UPDATE,
      })
      .then((recipe: any) => {
        return recipe;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
