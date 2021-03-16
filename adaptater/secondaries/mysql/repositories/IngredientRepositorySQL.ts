import { QueryTypes } from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import db from "../config/db";
import { IngredientSequelize } from "../entities/Ingredient.model";

export default class IngredientRepositorySQL implements IngredientRepository {
    findAll(): Promise<Ingredient[]> {
        return IngredientSequelize.findAll({
                type: QueryTypes.SELECT,
            })
            .then((ingredients) => {
                if (ingredients.length != 0) {
                    return ingredients;
                } else {
                    throw new Error("Il n'y a pas d'ingrédients");
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}