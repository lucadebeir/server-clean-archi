import {Op, QueryTypes} from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import IngredientRepository from "../../../../core/ports/repositories/Ingredient.repository";
import IngredientSequelize from "../entities/Ingredient.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class IngredientRepositorySQL implements IngredientRepository {
    existById = (id: any): Promise<boolean> => IngredientSequelize.findOne({
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

    checkExistInRecipes = (id: any): Promise<boolean> => UseIngredientSequelize.findOne({
        where: {
            id_ingredient: id,
        },
    })
        .then((result: any) => {
            return !!result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    checkExistByName = (name: any): Promise<boolean> => IngredientSequelize.findOne({
        where: {
            name: name,
        },
    })
        .then((result: any) => {
            return !!result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    create = (ingredientToCreate: Ingredient): Promise<Ingredient> => IngredientSequelize.create(ingredientToCreate)
        .then((ingredientCreate) => {
            return ingredientCreate;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findAll = (): Promise<Ingredient[]> => IngredientSequelize.findAll({
        type: QueryTypes.SELECT,
    })
        .then((ingredients: any) => {
            let result: Ingredient[] = ingredients.map(ingredient => ingredient.dataValues);
            return result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findById = (id: any): Promise<Ingredient> => IngredientSequelize.findOne({
        where: {
            id: id,
        },
    })
        .then((ingredient: any) => {
            return ingredient;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findRestOfIngredientsPerToList = (idIngredients: any): Promise<Ingredient[]> => IngredientSequelize.findAll({
        order: [["id", "ASC"]],
        where: {
            id: {[Op.notIn]: idIngredients},
        },
    })
        .then((ingredients: any) => {
            let result: Ingredient[] = ingredients.map(ingredient => ingredient.dataValues);
            return result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findIngredientsNotInRecipe = (id: any): Promise<Ingredient[]> => IngredientSequelize.findAll({
        attributes: ["id"],
        raw: true,
        include: [
            {
                model: UseIngredientSequelize,
                required: true,
                where: {
                    id_recipe: id,
                },
                attributes: [],
            },
        ],
    })
        .then((data: any) => {
            let array = data.map((item: Ingredient) => item.id);
            return IngredientSequelize.findAll({
                where: {
                    id: {
                        [Op.notIn]: array,
                    },
                },
            });
        })
        .then((ingredients: any) => {
            let result: Ingredient[] = ingredients.map(ingredient => ingredient.dataValues);
            return result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    deleteById = (id: any): Promise<string> => IngredientSequelize.destroy({
        where: {
            id: id,
        },
    })
        .then(() => {
            return "L'ingrédient a bien été supprimé";
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    update = (ingredientToUpdate: Ingredient): Promise<any> => {
        return IngredientSequelize.update(
            {name: ingredientToUpdate.name, image_link: ingredientToUpdate.image_link},
            {where: {id: ingredientToUpdate.id}}
        )
            .then((ingredient) => {
                return ingredient;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    };
}
