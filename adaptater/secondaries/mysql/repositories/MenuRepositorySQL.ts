import Menu from "../../../../core/domain/Menu";
import Recipe from "../../../../core/domain/Recipe";
import MenuRepository from "../../../../core/ports/repositories/Menu.repository";
import db from "../config/db";
import { QueryTypes } from "sequelize";

export default class MenuRepositorySQL implements MenuRepository {
    findMenu(): Promise<Menu> {
        return db.sequelize
        .query(
          "SELECT idMenu, recettes.* FROM menus INNER JOIN recettes ON menus.idRecette = recettes.idRecette"
        ,{
            type: QueryTypes.SELECT,
          }
          )
        .then((menu: any) => {
          if (menu) {
              console.log(menu)
            return (menu);
          } else {
            throw new Error("Pas de recettes disponibles dans le menu");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
    
    findById(id: any): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    updateById(id: any, idRecette: any): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    
}