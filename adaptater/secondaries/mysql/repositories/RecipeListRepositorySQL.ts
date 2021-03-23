import RecipeList from "../../../../core/domain/RecipeList";
import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import RecipeListSequelize from "../entities/RecipeList.model";

export default class RecipeListRepositorySQL implements RecipeListRepository {
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
    return RecipeListSequelize.findOne({
      where: {
        nomRecette: recipeToAdd.nomRecette,
      },
    })
      .then((recipe) => {
        if (!recipe) {
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
        } else {
          throw new Error(
            "Cet recette existe déjà dans votre liste de recettes de la semaine"
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateState(state: boolean, id: any, pseudo: any): Promise<RecipeList> {
    return RecipeListSequelize.findOne({
      where: {
        idRecipeList: id,
        pseudoUser: pseudo,
      },
    }).then((recipeList) => {
      if (!recipeList) {
        throw new Error("Problème technique");
      } else {
        return RecipeListSequelize.update(
          { complet: state },
          { where: { idRecipeList: id, pseudoUser: pseudo } }
        )
          .then((recipe) => {
            if (recipe) {
              return recipeList;
            } else {
              throw new Error("Problème technique");
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
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
