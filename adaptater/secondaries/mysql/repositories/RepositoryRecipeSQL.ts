import Recipe from "../../../../core/domain/Recipe";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import { RecipeSequelize } from "../entities/Recipe.model";
import { Category } from "../../../../core/domain/Category";
import { Ingredient } from "../../../../core/domain/Ingredient";

export default class RepositoryRecipeSQL implements RecipeRepository {
  findAll(order: string): Promise<Recipe[]> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette order by recettes.datePublication " +
          order,
        {
          type: QueryTypes.SELECT,
        }
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

  findById(id: any): Promise<Recipe> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette and recettes.idRecette = ? limit 1",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
          raw: false,
          model: RecipeSequelize,
          mapToModel: false,
        }
      )
      .then((recipe: any) => {
        if (recipe[0]) {
          return recipe[0];
        } else {
          throw new Error("Il n'y a pas de recette avec l'identifiant " + id);
        }
      })
      .catch((err: string | undefined) => {
        throw new Error(err);
      });
  }

  findAllPerToNbView(): Promise<Recipe[]> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette order by recettes.nbVues DESC",
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((recipe) => {
        if (recipe) {
          return recipe;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getIngredientsById(id: any): Promise<Ingredient[]> {
    return db.sequelize
      .query(
        "SELECT ingredient.idIngredient, ingredient.nomIngredient, utiliserIngredients.qte, unites.libelleUnite FROM ingredient INNER JOIN recettes INNER JOIN utiliserIngredients INNER JOIN unites WHERE ingredient.idIngredient = utiliserIngredients.idIngredient AND utiliserIngredients.idRecette = ? AND utiliserIngredients.idRecette = recettes.idRecette AND unites.idUnite = utiliserIngredients.idUnite ORDER BY ingredient.nomIngredient",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      )
      .then((resultats) => {
        return resultats;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getLatestRecipes(): Promise<Recipe[]> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette order by recettes.datePublication desc LIMIT 3",
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((recipe) => {
        if (recipe) {
          return recipe;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getMostPopularRecipes(): Promise<Recipe[]> {
    return db.sequelize
      .query(
        "select recettes.*, images.* from recettes, images, illustrerRecettes where illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette order by recettes.nbVues desc LIMIT 12",
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((recipes) => {
        if (recipes) {
          return recipes;
        } else {
          throw new Error("Il n'y a pas de recettes");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  getRecipesOfCategory(id: any): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  getRecipesOfCategoryPerToNbView(id: any): Promise<Recipe[]> {
    throw new Error("Method not implemented.");
  }
  updateNbView(id: any): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<string> {
    throw new Error("Method not implemented.");
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
