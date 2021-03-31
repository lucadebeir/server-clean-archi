import IllustrateRecipeDomain from "../../../../core/domain/IllustrateRecipe.domain";
import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import IllustrateRecipeSequelize from "../entities/IllustrateRecipe.model";

export default class IllustrateRecipeRepositorySQL
  implements IllustrateRecipeRepository {
  check(illustrateRecipe: IllustrateRecipeDomain): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  addToRecette(illustrateRecipe: IllustrateRecipeDomain): Promise<string> {
    const data = {
      idImage: illustrateRecipe.idImage,
      idRecipe: illustrateRecipe.idRecette,
    };
    return IllustrateRecipeSequelize.create(data)
      .then(() => {
        return "Image ajoutée avec succès à la recette";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateFromRecipe(illustrateRecipe: IllustrateRecipeDomain): Promise<string> {
    return IllustrateRecipeSequelize.update(
      { idImage: illustrateRecipe.idImage },
      { where: { idRecette: illustrateRecipe.idRecette } }
    )
      .then(() => {
        return "Image modifiée avec succès";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
