import ClassifyIn from "../../../../core/domain/ClassifyIn";
import ClassifyInRepository from "../../../../core/ports/repositories/ClassifyIn.repository";
import ClassifyInSequelize from "../entities/ClassifyIn.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class ClassifyInRepositorySQL implements ClassifyInRepository {
  check(classify: ClassifyIn): Promise<boolean> {
    return ClassifyInSequelize.findOne({
      where: {
        id_recipe: classify.id_recipe,
        id_category: classify.id_category,
      },
    })
      .then((result) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  addCategoryToRecipe(classify: ClassifyIn): Promise<string> {
    return ClassifyInSequelize.create(classify)
      .then(() => {
        return "Catégorie ajoutée de cette recette";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  deleteCategoryFromRecipe(classify: ClassifyIn): Promise<string> {
    return ClassifyInSequelize.destroy({
      where: {
        id_recipe: classify.id_recipe,
        id_category: classify.id_category,
      },
    })
      .then(() => {
        return "Catégorie supprimée de cette recette";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
