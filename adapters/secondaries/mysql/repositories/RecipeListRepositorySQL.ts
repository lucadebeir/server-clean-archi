import RecipeList from "../../../../core/domain/RecipeList";
import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import RecipeListSequelize from "../entities/RecipeList.model";
import ImageSequelize from "../entities/Image.model";
import RecipeSequelize from "../entities/Recipe.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class RecipeListRepositorySQL implements RecipeListRepository {
    updateDay(recipe: RecipeList): Promise<string> {
        return RecipeListSequelize.update(
            {day: recipe.day},
            {
                where: {
                    id: recipe.id,
                    pseudo: recipe.pseudo,
                },
            }
        )
            .then((recipe) => {
                return "Le jour de la recette a bien été modifié";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    existByName(name: any, pseudo: any): Promise<boolean> {
        return RecipeListSequelize.findOne({
            where: {
                pseudo: pseudo,
                name_recipe: name,
            },
        })
            .then((result: any) => {
                return !!result;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    existById(id: any): Promise<boolean> {
        return RecipeListSequelize.findOne({
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
    }

    findById(pseudo: any): Promise<RecipeList[]> {
        return RecipeListSequelize.findAll({
            include: [
                {
                    model: RecipeSequelize,
                    required: true,
                    include: [ImageSequelize]
                },
            ],
            where: {
                pseudo: pseudo,
            },
        })
            .then((recipeList) => {
                return recipeList;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    addRecipe(recipeToAdd: RecipeList): Promise<RecipeList> {
        return RecipeListSequelize.create(recipeToAdd)
            .then((recipeList) => {
                return recipeList;
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    updateState(recipe: RecipeList): Promise<string> {
        return RecipeListSequelize.update(
            {complete: recipe.complete},
            {
                where: {
                    id: recipe.id,
                    pseudo: recipe.pseudo,
                },
            }
        )
            .then((recipe) => {
                return "L'état de la recette a bien été modifié";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    deleteById(id: any, pseudo: any): Promise<string> {
        return RecipeListSequelize.destroy({
            where: {
                id_recipe: id,
                pseudo: pseudo,
            },
        })
            .then(() => {
                return "Recette supprimée de la liste!";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }

    deleteAll(pseudo: any): Promise<string> {
        return RecipeListSequelize.destroy({
            where: {
                pseudo: pseudo,
            },
            truncate: true,
        })
            .then(() => {
                return "Recettes supprimées de la liste!";
            })
            .catch((err) => {
                throw new TechnicalException(err.message);
            });
    }
}
