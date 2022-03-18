import Favori from "../../../../core/domain/Favori";
import FavoriRepository from "../../../../core/ports/repositories/Favori.repository";
import FavoriSequelize from "../entities/Favori.model";
import RecipeSequelize from "../entities/Recipe.model";
import CategorySequelize from "../entities/Category.model";
import Recipe from "../../../../core/domain/Recipe";
import StepSequelize from "../entities/Step.model";
import ImageSequelize from "../entities/Image.model";
import IngredientSequelize from "../entities/Ingredient.model";
import NotationSequelize from "../entities/Notation.model";
import UnitySequelize from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import RecipesFilter from "../../../../core/domain/RecipesFilter";
import {Op} from "sequelize";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class FavoriRepositorySQL implements FavoriRepository {
    research(data: RecipesFilter, pseudo: string): Promise<Recipe[]> {
        return RecipeSequelize.findAll({
            include: [
                {
                    model: FavoriSequelize,
                    attributes: [],
                    required: true,
                    where: {
                        pseudo: pseudo,
                    },
                },
                {
                    model: CategorySequelize,
                    //attributes: ["libelleCategorie"],
                    as: "categories",
                    required: true,
                    through: {
                        attributes: [],
                    },
                    where: {id: {[Op.in]: data.idsCategories}},
                },
                {
                    model: UseIngredientSequelize,
                    attributes: ["quantity"],
                    required: true,
                    include: [
                        {
                            model: IngredientSequelize,
                            //attributes: ["nomIngredient"]
                        },
                        {
                            model: UnitySequelize,
                            //attributes: ["libelleUnite"]
                        },
                    ],
                },
                {
                    model: ImageSequelize,
                    as: "images",
                    required: true,
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: StepSequelize,
                    required: false,
                },
                {
                    model: NotationSequelize,
                    required: false,
                    attributes: ["note"],
                },
            ],
            order: [[data.popular ? "number_views" : "date", "desc"]],
        })
            .then((recipes: any) => {
                return recipes;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    check(favori: Favori): Promise<boolean> {
        return FavoriSequelize.findOne({
            where: {
                id_recipe: favori.id_recipe,
                pseudo: favori.pseudo,
            },
            attributes: ['id_recipe', 'pseudo']
        })
            .then((result) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    create(favoriToCreate: Favori): Promise<string> {
        RecipeSequelize.findOne({
            where: {
                id: favoriToCreate.id_recipe,
            },
        })
            .then((recipe) => {
                if (recipe?.number_favorites) {
                    RecipeSequelize.update(
                        {number_favorites: recipe.number_favorites + 1},
                        {where: {id: favoriToCreate.id_recipe}}
                    ).then();
                }
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });

        return FavoriSequelize.create(favoriToCreate)
            .then((favoriCreate) => {
                return "Ajouté aux favoris !";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findByIdUser(pseudo: any): Promise<Recipe[]> {
        return RecipeSequelize.findAll({
            include: [
                {
                    model: FavoriSequelize,
                    attributes: [],
                    required: true,
                    where: {
                        pseudo: pseudo,
                    },
                },
                {
                    model: CategorySequelize,
                    //attributes: ["libelleCategorie"],
                    as: "categories",
                    required: true,
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: UseIngredientSequelize,
                    attributes: ["quantity"],
                    required: true,
                    include: [
                        {
                            model: IngredientSequelize,
                            //attributes: ["nomIngredient"]
                        },
                        {
                            model: UnitySequelize,
                            //attributes: ["libelleUnite"]
                        },
                    ],
                },
                {
                    model: ImageSequelize,
                    as: "images",
                    required: true,
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: StepSequelize,
                    required: false,
                },
                {
                    model: NotationSequelize,
                    required: false,
                    attributes: ["note"],
                },
            ],
            order: [["date", "DESC"]],
        })
            .then((favoris) => {
                return favoris;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    findByIdUserPerToCategory(pseudo: any, id_category: any): Promise<Recipe[]> {
        return RecipeSequelize.findAll({
            include: [
                {
                    model: FavoriSequelize,
                    attributes: [],
                    required: true,
                    where: {
                        pseudo: pseudo,
                    },
                },
                {
                    model: CategorySequelize,
                    attributes: [],
                    as: "categories",
                    where: {
                        id: id_category,
                    },
                },
            ],
            order: [["date", "DESC"]],
        })
            .then((favoris) => {
                return favoris;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    deleteById(favori: Favori): Promise<string> {
        RecipeSequelize.findOne({
            where: {
                id: favori.id_recipe,
            },
        })
            .then((recipe) => {
                if (recipe?.number_favorites) {
                    RecipeSequelize.update(
                        {
                            number_favorites: recipe.number_favorites - 1,
                        },
                        {
                            where: {
                                id: favori.id_recipe,
                            },
                        }
                    );
                }
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });

        return FavoriSequelize.destroy({
            where: {
                id_recipe: favori.id_recipe,
                pseudo: favori.pseudo,
            },
        })
            .then(() => "Supprimé des favoris !")
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
