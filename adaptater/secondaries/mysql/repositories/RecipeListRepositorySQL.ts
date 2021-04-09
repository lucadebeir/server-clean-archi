import RecipeList from "../../../../core/domain/RecipeList";
import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import RecipeListSequelize from "../entities/RecipeList.model";

export default class RecipeListRepositorySQL implements RecipeListRepository {
  existByName(name: any, pseudo: any): Promise<boolean> {
    return RecipeListSequelize.findOne({
      where: {
        pseudoUser: pseudo,
        nomRecette: name,
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

  existById(id: any): Promise<boolean> {
    return RecipeListSequelize.findOne({
      where: {
        idRecette: id,
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
        pseudoUser: pseudo,
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
      { complet: recipe.complet },
      {
        where: {
          idRecipeList: recipe.idRecipeList,
          pseudoUser: recipe.pseudoUser,
        },
      }
    )
      .then((recipe) => {
        if (recipe) {
          return "L'état de la recette a bien été  modifié";
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
        idRecipeList: id,
        pseudoUser: pseudo,
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
        pseudoUser: pseudo,
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
