import UseIngredient from "../../../../core/domain/UseIngredient";
import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import UseIngredientSequelize from "../entities/UseIngredient.model";

export default class UseIngredientRepositorySQL
  implements UseIngredientRepository {
  check(useIngredient: UseIngredient): Promise<boolean> {
    return UseIngredientSequelize.findOne({
      where: {
        id_recipe: useIngredient.id_recipe,
        id_ingredient: useIngredient.id_ingredient,
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

  update(useIngredientToUpdate: UseIngredient): Promise<string> {
    return UseIngredientSequelize.update(
      {
        quantity: useIngredientToUpdate.quantity,
        id_unit: useIngredientToUpdate.id_unit,
      },
      {
        where: {
          id_recipe: useIngredientToUpdate.id_recipe,
          id_ingredient: useIngredientToUpdate.id_ingredient,
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

  delete(idRecette: any, idIngredient: any): Promise<string> {
    return UseIngredientSequelize.destroy({
      where: {
        id_recipe: idRecette,
        id_ingredient: idIngredient,
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
