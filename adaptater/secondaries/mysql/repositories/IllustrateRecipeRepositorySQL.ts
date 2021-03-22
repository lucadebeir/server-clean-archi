import IllustrateRecipeRepository from "../../../../core/ports/repositories/IllustrateRecipe.repository";
import IllustrateRecipeSequelize from "../entities/IllustrateRecipe.model";

export default class IllustrateRecipeRepositorySQL
  implements IllustrateRecipeRepository {
  addToRecette(idImage: any, idRecipe: any): Promise<string> {
    const data = {
      idImage: idImage,
      idRecipe: idRecipe,
    };
    return IllustrateRecipeSequelize.create(data)
      .then(() => {
        return "Image ajoutée avec succès à la recette";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  updateFromRecipe(idImage: any, idRecipe: any): Promise<string> {
    return IllustrateRecipeSequelize.update(
      { idImage: idImage },
      { where: { idRecette: idRecipe } }
    )
      .then(() => {
        return "Image modifiée avec succès";
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
