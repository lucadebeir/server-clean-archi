import { QueryTypes } from "sequelize";
import Category from "../../../../core/domain/Category";
import Recipe from "../../../../core/domain/Recipe";
import CategoryRepository from "../../../../core/ports/repositories/Category.repository";
import db from "../config/db";
import { CategorySequelize } from "../entities/Category.model";

export default class CategoryRepositorySQL implements CategoryRepository {
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
}