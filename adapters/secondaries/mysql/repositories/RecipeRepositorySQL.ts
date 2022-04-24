import Recipe from "../../../../core/domain/Recipe";
import RecipesFilter from "../../../../core/domain/RecipesFilter";
import RecipeRepository from "../../../../core/ports/repositories/Recipe.repository";
import RecipeSequelize from "../entities/Recipe.model";
import Category from "../../../../core/domain/Category";
import CategorySequelize from "../entities/Category.model";
import IngredientSequelize from "../entities/Ingredient.model";
import ImageSequelize from "../entities/Image.model";
import UnitySequelize from "../entities/Unity.model";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import ClassifyInSequelize from "../entities/ClassifyIn.model";
import IllustrateRecipeSequelize from "../entities/IllustrateRecipe.model";
import MenuSequelize from "../entities/Menu.model";
import RecipeListSequelize from "../entities/RecipeList.model";
import StepSequelize from "../entities/Step.model";
import NotationSequelize from "../entities/Notation.model";
import CommentaireSequelize from "../entities/Commentaire.model";
import {Op} from "sequelize";
import UseIngredient from "../../../../core/domain/UseIngredient";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class RecipeRepositorySQL implements RecipeRepository {

    update = (recipe: Recipe): Promise<Recipe> => RecipeSequelize.update(recipe, {
        where: {id: recipe.id},
    })
        .then(() => {
            return recipe;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    existByName = (name: any): Promise<boolean> => RecipeSequelize.findOne({
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

    useInMenu = (id: any): Promise<boolean> => MenuSequelize.findOne({
        where: {
            id_recipe: id,
        },
    })
        .then((result: any) => {
            return !!result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    useInRecipeList = (id: any): Promise<boolean> => RecipeListSequelize.findOne({
        where: {
            id_recipe: id,
        },
    })
        .then((result: any) => {
            return !!result;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    existById = (id: any): Promise<boolean> => RecipeSequelize.findOne({
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

    findAll = (order: string): Promise<Recipe[]> => RecipeSequelize.findAll({
        include: [
            {
                model: ClassifyInSequelize,
                include: [CategorySequelize]
            },
            {
                model: UseIngredientSequelize,
                attributes: ["quantity"],
                required: true,
                include: [
                    {
                        model: IngredientSequelize
                    },
                    {
                        model: UnitySequelize
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
                attributes: ["number", "indication"]
            },
            {
                model: NotationSequelize,
                required: false,
                attributes: ["note"],
            },
        ],
        order: [["date", order]],
    })
        .then((recipes: any) => {
            return recipes;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findById = (id: any): Promise<Recipe> => RecipeSequelize.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: ClassifyInSequelize,
                include: [CategorySequelize]
            },
            {
                model: UseIngredientSequelize,
                attributes: ["quantity"],
                required: true,
                include: [
                    {
                        model: IngredientSequelize,
                    },
                    {
                        model: UnitySequelize,
                    },
                ],
            },
            {
                model: ImageSequelize,
                as: "images",
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
                as: "ratings",
            },
            {
                model: CommentaireSequelize,
                required: false,
            },
        ],
    })
        .then((recipe: any) => {
            return recipe;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    findAllPerToNbView = (): Promise<Recipe[]> => RecipeSequelize.findAll({
        include: [
            {
                model: ClassifyInSequelize,
                include: [CategorySequelize]
            },
            {
                model: UseIngredientSequelize,
                attributes: ["quantity"],
                required: true,
                include: [
                    {
                        model: IngredientSequelize,
                    },
                    {
                        model: UnitySequelize,
                    },
                ],
            },
            {
                model: ImageSequelize,
                as: "images",
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
        order: [["number_views", "DESC"]],
    })
        .then((recipes) => {
            return recipes;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    getIngredientsByIdRecipe = (id: any): Promise<UseIngredient[]> => UseIngredientSequelize.findAll({
        where: {
            id_recipe: id,
        },
        attributes: ["quantity"],
        include: [
            {
                model: IngredientSequelize,
            },
            {
                model: UnitySequelize,
            },
        ],
    })
        .then((ingredients) => {
            return ingredients;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    getCategoriesByIdRecipe = (id: any): Promise<Category[]> => CategorySequelize.findAll({
        include: [
            {
                model: ClassifyInSequelize,
                where: {
                    id_recipe: id,
                },
                attributes: [],
            },
        ],
    })
        .then((categories) => {
            return categories;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    getLatestRecipes = (): Promise<Recipe[]> => RecipeSequelize.findAll({
        include: [
            {
                model: CategorySequelize,
                as: "categories",
                through: {
                    attributes: [],
                }
            },
            {
                model: UseIngredientSequelize,
                attributes: ["quantity"],
                required: true,
                include: [
                    {
                        model: IngredientSequelize,
                    },
                    {
                        model: UnitySequelize,
                    },
                ],
            },
            {
                model: ImageSequelize,
                as: "images",
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
        limit: 3,
    })
        .then((recipes) => {
            return recipes;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    getMostPopularRecipes = (): Promise<Recipe[]> => RecipeSequelize.findAll({
        include: [
            {
                model: CategorySequelize,
                as: "categories",
                through: {
                    attributes: [],
                }
            },
            {
                model: UseIngredientSequelize,
                attributes: ["quantity"],
                required: true,
                include: [
                    {
                        model: IngredientSequelize,
                    },
                    {
                        model: UnitySequelize,
                    },
                ],
            },
            {
                model: ImageSequelize,
                as: "images",
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
        order: [["number_views", "DESC"]],
        limit: 12,
    })
        .then((recipes) => {
            return recipes;
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    updateNbView = (id: any): Promise<string> => RecipeSequelize.findOne({
        where: {
            id: id,
        },
    })
        .then((recipe: any) => {
            return RecipeSequelize.update(
                {number_views: recipe.number_views + 1},
                {where: {id: id}}
            )
                .then((recipe: any) => {
                    return "Nombre de vues bien incrémenté";
                })
                .catch((err) => {
                    throw new TechnicalException(err.message);
                })
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    deleteById = (id: any): Promise<string> => RecipeSequelize.destroy({
        where: {
            id: id,
        },
    })
        .then(() => {
            return "Recette supprimée!";
        })
        .catch((err) => {
            throw new TechnicalException(err.message);
        });

    create = (recipe: Recipe): Promise<Recipe> => RecipeSequelize.create(recipe, {
        include: [
            ClassifyInSequelize,
            IllustrateRecipeSequelize,
            UseIngredientSequelize,
            StepSequelize,
        ],
    })
        .then((recipeCreate) => {
            return recipeCreate;
        })
        .catch((err) => {
            console.error(err.message)
            throw new TechnicalException(err.message);
        });

    research = (data: RecipesFilter): Promise<Recipe[]> => RecipeSequelize.findAll({
        include: [
            {
                model: CategorySequelize,
                //attributes: ["libelleCategorie"],
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
