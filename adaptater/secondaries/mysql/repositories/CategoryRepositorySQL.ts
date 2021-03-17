import { QueryTypes } from "sequelize";
import Category from "../../../../core/domain/Category";
import Recipe from "../../../../core/domain/Recipe";
import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import db from "../config/db";
import { CategorySequelize } from "../entities/Category.model";

export default class CategoryRepositorySQL implements CategoryRepository {
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
    return db.sequelize
      .query(
        "SELECT * FROM categories WHERE categories.idCategorie NOT IN (SELECT categories.idCategorie FROM recettes INNER JOIN classerDans INNER JOIN categories WHERE recettes.idRecette = classerDans.idRecette AND classerDans.idCategorie = categories.idCategorie AND recettes.idRecette = ?)",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      )
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
    return db.sequelize
      .query(
        "SELECT recettes.*, images.* FROM recettes, images, illustrerRecettes INNER JOIN categories INNER JOIN classerDans WHERE illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette and classerDans.idCategorie = categories.idCategorie AND classerDans.idRecette = recettes.idRecette AND categories.idCategorie = ? ORDER BY recettes.datePublication DESC",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      )
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
    return db.sequelize
      .query(
        "SELECT recettes.*, images.* FROM recettes, images, illustrerRecettes INNER JOIN categories INNER JOIN classerDans WHERE illustrerRecettes.idImage = images.idImage and illustrerRecettes.idRecette = recettes.idRecette and classerDans.idCategorie = categories.idCategorie AND classerDans.idRecette = recettes.idRecette AND categories.idCategorie = ? ORDER BY recettes.nbVues DESC",
        {
          replacements: [id],
          type: QueryTypes.SELECT,
        }
      )
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
}
