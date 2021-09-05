import RecipeList from "../../../../core/domain/RecipeList";
import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import RecipeListSequelize from "../entities/RecipeList.model";

export default class RecipeListRepositorySQL implements RecipeListRepository {
  updateDay(recipe: RecipeList): Promise<string> {
    return RecipeListSequelize.update(
      { day: recipe.day },
      {
        where: {
          id: recipe.id,
          pseudo: recipe.pseudo,
        },
      }
    )
      .then((recipe) => {
        if (recipe) {
          return "Le jour de la recette a bien été modifié";
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
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
        if (result) {
          console.log("lol");
          return true;
        } else {
          console.log(false);

          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  existById(id: any): Promise<boolean> {
    return RecipeListSequelize.findOne({
      where: {
        id_recipe: id,
      },
    })
      .then((result: any) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  findById(pseudo: any): Promise<RecipeList[]> {
    return RecipeListSequelize.findAll({
      where: {
        pseudo: pseudo,
      },
    })
      .then((recipeList) => {
        if (recipeList) {
          return recipeList;
        } else {
          throw new Error("Pas de recettes disponibles dans la liste");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  addRecipe(recipeToAdd: RecipeList): Promise<RecipeList> {
    return RecipeListSequelize.create(recipeToAdd)
      .then((recipeList) => {
        if (recipeList) {
          return recipeList;
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateState(recipe: RecipeList): Promise<string> {
    return RecipeListSequelize.update(
      { complete: recipe.complete },
      {
        where: {
          id: recipe.id,
          pseudo: recipe.pseudo,
        },
      }
    )
      .then((recipe) => {
        if (recipe) {
          return "L'état de la recette a bien été modifié";
        } else {
          throw new Error("Problème technique");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  deleteById(id: any, pseudo: any): Promise<string> {
    return RecipeListSequelize.destroy({
      where: {
        id: id,
        pseudo: pseudo,
      },
    })
      .then(() => {
        return "Recette supprimée à la liste!";
      })
      .catch((err) => {
        throw new Error(err);
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
        return "Recette supprimée à la liste!";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
