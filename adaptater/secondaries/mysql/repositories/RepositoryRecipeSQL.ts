import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import db from "../config/db";

export default class RepositoryRecipeSQL implements RecipeRepository {
  findById(id: any): Promise<Recipe> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Recipe[]> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette order by recettes.datePublication DESC"
      )
      .then((recipes: any) => {
        if (recipes) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err: string | undefined) => {
        throw new Error(err);
      });
  }

  /*findById(id: any): Promise<Recipe> {
    return db.sequelize.query(
      "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette and recettes.idRecette = ?",
      {
        replacements: [id],
      }
    );
  }*/
}
