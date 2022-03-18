import UseIngredient from "../../../../core/domain/UseIngredient";
import UseIngredientRepository from "../../../../core/ports/repositories/UseIngredient.repository";
import UseIngredientSequelize from "../entities/UseIngredient.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class UseIngredientRepositorySQL implements UseIngredientRepository {

  check(useIngredient: UseIngredient): Promise<boolean> {
    return UseIngredientSequelize.findOne({
      where: {
        id_recipe: useIngredient.id_recipe,
        id_ingredient: useIngredient.id_ingredient,
      },
    })
      .then((result: any) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  addIngredientToRecipe(useIngredientToAdd: UseIngredient): Promise<string> {
    return UseIngredientSequelize.create(useIngredientToAdd)
      .then((useIngredient: any) => {
        return useIngredient;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
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
        return "Unité modifiée !";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  delete(id_recipe: any, id_ingredient: any): Promise<string> {
    return UseIngredientSequelize.destroy({
      where: {
        id_recipe: id_recipe,
        id_ingredient: id_ingredient,
      },
    })
      .then(() => {
        return "Ingredient supprimé !";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
