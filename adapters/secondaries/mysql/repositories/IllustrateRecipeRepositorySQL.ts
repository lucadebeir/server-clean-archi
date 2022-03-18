import IllustrateRecipe from "../../../../core/domain/IllustrateRecipe";
import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import IllustrateRecipeSequelize from "../entities/IllustrateRecipe.model";
import {TechnicalException} from "../../../../core/exceptions/TechnicalException";

export default class IllustrateRecipeRepositorySQL implements IllustrateRecipeRepository {

  addToRecette(illustrateRecipe: IllustrateRecipe): Promise<string> {
    const data = {
      id_image: illustrateRecipe.id_image,
      id_recipe: illustrateRecipe.id_recipe,
    };
    return IllustrateRecipeSequelize.create(data)
      .then(() => {
        return "Image ajoutée avec succès à la recette";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  updateFromRecipe(illustrateRecipe: IllustrateRecipe): Promise<string> {
    return IllustrateRecipeSequelize.update(
      { id_image: illustrateRecipe.id_image },
      { where: { id_recipe: illustrateRecipe.id_recipe } }
    )
      .then(() => {
        return "Image modifiée avec succès";
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }

  check(illustrateRecipe: IllustrateRecipe): Promise<boolean> {
    return IllustrateRecipeSequelize.findOne({
      where: {
        id_recipe: illustrateRecipe.id_recipe,
        id_image: illustrateRecipe.id_image,
      },
    })
      .then((result: any) => {
        return !!result;
      })
      .catch((err) => {
        throw new TechnicalException(err.message);
      });
  }
}
