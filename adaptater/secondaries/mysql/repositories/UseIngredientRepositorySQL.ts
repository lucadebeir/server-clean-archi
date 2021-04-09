import UseIngredient from "../../../../core/domain/UseIngredient";
import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import UseIngredientSequelize from "../entities/UseIngredient.model";

export default class UseIngredientRepositorySQL
  implements UseIngredientRepository {
  check(useIngredient: UseIngredient): Promise<boolean> {
    return UseIngredientSequelize.findOne({
      where: {
        idRecette: useIngredient.idRecette,
        idIngredient: useIngredient.idIngredient,
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

  addIngredientToRecipe(useIngredientToAdd: UseIngredient): Promise<string> {
    return UseIngredientSequelize.findOne({
      where: {
        idIngredient: useIngredientToAdd.idIngredient,
        idRecette: useIngredientToAdd.idRecette,
      },
    })
      .then((useIngredient) => {
        if (useIngredient) {
          throw new Error("L'ingrédient est déjà présent dans cette recette");
        } else {
          return UseIngredientSequelize.create(useIngredientToAdd)
            .then((useIngredient: any) => {
              if (useIngredient) {
                return useIngredient;
              } else {
                throw new Error("Problème technique");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  update(useIngredientToUpdate: UseIngredient): Promise<string> {
    return UseIngredientSequelize.findOne({
      where: {
        idIngredient: useIngredientToUpdate.idIngredient,
        idRecette: useIngredientToUpdate.idRecette,
      },
    })
      .then((useIngredient) => {
        if (useIngredient) {
          throw new Error("L'ingrédient est déjà présent dans cette recette");
        } else {
          return UseIngredientSequelize.update(
            {
              qte: useIngredientToUpdate.qte,
              idUnite: useIngredientToUpdate.idUnite,
            },
            {
              where: {
                idRecette: useIngredientToUpdate.idRecette,
                idIngredient: useIngredientToUpdate.idIngredient,
              },
            }
          )
            .then(() => {
              return "Unité modifié !";
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  delete(idRecette: any, idIngredient: any): Promise<string> {
    return UseIngredientSequelize.destroy({
      where: {
        idRecette: idRecette,
        idIngredient: idIngredient,
      },
    })
      .then(() => {
        return "Ingredient supprimé !";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
