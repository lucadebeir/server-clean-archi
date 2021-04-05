import RecipeList from "../../../../core/domain/RecipeList";
import RecipeListRepository from "../../../../core/ports/repositories/RecipeList.repository";
import RecipeListSequelize from "../entities/RecipeList.model";

export default class RecipeListRepositorySQL implements RecipeListRepository {
  existByName(name: any, pseudo: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  existById(id: any, pseudo: any): Promise<boolean> {
    throw new Error("Method not implemented.");
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

  updateState(recipe: RecipeList): Promise<string> {
    return RecipeListSequelize.findOne({
      where: {
        idRecipeList: recipe.idRecipeList,
        pseudoUser: recipe.pseudoUser,
      },
    }).then((recipeList) => {
      if (!recipeList) {
        throw new Error("Problème technique");
      } else {
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
