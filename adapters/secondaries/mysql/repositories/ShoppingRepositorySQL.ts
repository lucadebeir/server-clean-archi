import {Op, QueryTypes} from "sequelize";
import Ingredient from "../../../../core/domain/Ingredient";
import Shopping from "../../../../core/domain/Shopping";
import ShoppingRepository from "../../../../core/ports/repositories/Shopping.repository";
import IngredientSequelize from "../entities/Ingredient.model";
import ShoppingSequelize from "../entities/Shopping.model";
import UnitySequelize from "../entities/Unity.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class ShoppingRepositorySQL implements ShoppingRepository {
    exist(pseudo: any, name: any): Promise<boolean> {
        return ShoppingSequelize.findOne({
            where: {
                pseudo: pseudo,
                name_ingredient: name,
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findById(pseudo: any): Promise<Shopping[]> {
        return ShoppingSequelize.findAll({
            where: {
                pseudo: pseudo,
            },
            order: [["name_ingredient", "ASC"]],
            type: QueryTypes.SELECT,
            include: [
                {
                    model: IngredientSequelize,
                    required: false,
                },
                {
                    model: UnitySequelize,
                    required: false,
                },
            ],
        })
            .then((list) => {
                return list;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findIngredientsNotInShoppingListById(pseudo: any): Promise<Ingredient[]> {
        return ShoppingSequelize.findAll({
            where: {
                pseudo: pseudo,
            },
        })
            .then((data: any) => {
                let array = data.map((item: any) =>
                    item.id_ingredient ? item.id_ingredient : ""
                );
                return IngredientSequelize.findAll({
                    where: {
                        id: {
                            [Op.notIn]: array,
                        },
                    },
                });
            })
            .then((ingredients) => {
                return ingredients;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    addIngredientToShoppingList(shopping: Shopping): Promise<string> {
        return ShoppingSequelize.findOne({
            where: {
                name_ingredient: shopping.name_ingredient,
                id_ingredient: shopping.ingredient?.id,
                pseudo: shopping.pseudo
            }
        })
            .then(result => {
                if (result) {
                    return ShoppingSequelize.update(
                        {quantity: (shopping.quantity + result.quantity)},
                        {where: {id: result.id}}
                    )
                        .then((shopping) => {
                            return "L'ingrédient a bien été modifié";
                        })
                        .catch((err) => {
                            throw new TechnicalException(err.message);
                        });
                } else {
                    return ShoppingSequelize.create({
                        pseudo: shopping.pseudo,
                        id_ingredient: shopping.ingredient?.id,
                        name_ingredient: shopping.name_ingredient,
                        quantity: shopping.quantity,
                        id_unit: shopping.unit?.id
                    })
                        .then((shopping) => {
                            return "L'ingrédient a bien été ajouté";
                        })
                        .catch((err) => {
                            throw new TechnicalException(err.message);
                        });
                }
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            })
    }

    deleteById(id: any): Promise<string> {
        return ShoppingSequelize.destroy({
            where: {
                id: id,
            },
        })
            .then(() => {
                return "Ingredient supprimé avec succès !";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
